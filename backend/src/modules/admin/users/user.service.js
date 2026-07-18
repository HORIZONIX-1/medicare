const bcrypt = require("bcryptjs");
const prisma = require("../../../config/prisma");

const PASSWORD_SALT_ROUNDS = Number.parseInt(process.env.PASSWORD_SALT_ROUNDS || "12", 10);

class UserManagementError extends Error {
  constructor(message, statusCode = 500, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const userSelect = {
  user_id: true,
  name: true,
  email: true,
  role: true,
  is_first_login: true,
  is_active: true,
  created_at: true,
  organization_id: true,
  organization: {
    select: {
      name: true,
    },
  },
};

const sanitizeUser = (user) => ({
  id: user.user_id,
  name: user.name,
  email: user.email,
  role: user.role,
  isFirstLogin: user.is_first_login,
  isActive: user.is_active,
  createdAt: user.created_at,
  organizationId: user.organization_id,
  organizationName: user.organization ? user.organization.name : null,
});

const buildAuditMetadata = (metadata) => {
  if (!metadata) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(metadata));
};

const writeAuditLog = async ({ actorId, action, entityId, metadata, req }) => {
  try {
    await prisma.auditLog.create({
      data: {
        actor_user_id: actorId || null,
        action,
        entity: "User",
        entity_id: entityId ? String(entityId) : null,
        metadata: buildAuditMetadata(metadata),
        ip_address: req?.ip || null,
        user_agent: req?.get?.("user-agent") || null,
      },
    });
  } catch (error) {
    console.error("Audit log write failed:", error);
  }
};

const getExistingUser = async (id, options = {}) => {
  const user = await prisma.user.findUnique({
    where: { user_id: Number(id) },
    select: userSelect,
  });

  if (!user) {
    throw new UserManagementError("User not found", 404);
  }

  return user;
};

const createUser = async (payload, context = {}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
    select: { user_id: true },
  });

  if (existingUser) {
    throw new UserManagementError("Email is already in use", 409);
  }

  const hashedPassword = await bcrypt.hash(payload.password, PASSWORD_SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
      is_active: payload.isActive,
      is_first_login: true,
      organization_id: payload.organizationId ? Number(payload.organizationId) : null,
    },
    select: userSelect,
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "USER_CREATED",
    entityId: user.user_id,
    metadata: { role: user.role, email: user.email, organizationId: user.organization_id },
    req: context.req,
  });

  try {
    const { createSystemNotification } = require("../notifications/notification.service");
    await createSystemNotification({
      title: "New User Registered",
      message: `User ${user.name} (${user.email}) has been registered with role ${user.role}.`,
      type: "SYSTEM",
    });
  } catch (err) {
    console.error("Failed to trigger user creation notification:", err);
  }

  return sanitizeUser(user);
};

const getUsers = async (query) => {
  const page = Number.parseInt(query.page || "1", 10);
  const limit = Number.parseInt(query.limit || "10", 10);
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy || "created_at";
  const sortOrder = query.sortOrder || "desc";
  const where = {};

  if (query.role) {
    where.role = query.role;
  }

  if (query.isActive !== undefined) {
    where.is_active = query.isActive === "true" || query.isActive === true;
  }

  if (query.organizationId) {
    if (query.organizationId === "none" || query.organizationId === "null") {
      where.organization_id = null;
    } else {
      where.organization_id = Number(query.organizationId);
    }
  }

  if (query.search) {
    where.OR = [
      { name: { contains: query.search } },
      { email: { contains: query.search } },
    ];
  }

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: userSelect,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users.map(sanitizeUser),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    },
  };
};

const getUserById = async (id) => sanitizeUser(await getExistingUser(id));

const updateUser = async (id, payload, context = {}) => {
  await getExistingUser(id);

  if (payload.email) {
    const userWithEmail = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { user_id: true },
    });

    if (userWithEmail && userWithEmail.user_id !== Number(id)) {
      throw new UserManagementError("Email is already in use", 409);
    }
  }

  const data = {};

  if (payload.name !== undefined) data.name = payload.name;
  if (payload.email !== undefined) data.email = payload.email;
  if (payload.role !== undefined) data.role = payload.role;
  if (payload.isActive !== undefined) data.is_active = payload.isActive;
  if (payload.organizationId !== undefined) {
    data.organization_id = payload.organizationId ? Number(payload.organizationId) : null;
  }

  const user = await prisma.user.update({
    where: { user_id: Number(id) },
    data,
    select: userSelect,
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "USER_UPDATED",
    entityId: user.user_id,
    metadata: { changedFields: Object.keys(data) },
    req: context.req,
  });

  return sanitizeUser(user);
};

const softDeleteUser = async (id, context = {}) => {
  if (Number(id) === Number(context.actorId)) {
    throw new UserManagementError("You cannot delete your own account", 400);
  }

  await getExistingUser(id);

  const user = await prisma.user.update({
    where: { user_id: Number(id) },
    data: {
      is_active: false,
    },
    select: userSelect,
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "USER_SOFT_DELETED",
    entityId: user.user_id,
    metadata: { email: user.email },
    req: context.req,
  });

  return sanitizeUser(user);
};

const setUserActiveStatus = async (id, isActive, context = {}) => {
  if (Number(id) === Number(context.actorId) && !isActive) {
    throw new UserManagementError("You cannot deactivate your own account", 400);
  }

  await getExistingUser(id);

  const user = await prisma.user.update({
    where: { user_id: Number(id) },
    data: { is_active: isActive },
    select: userSelect,
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: isActive ? "USER_ACTIVATED" : "USER_DEACTIVATED",
    entityId: user.user_id,
    metadata: { email: user.email },
    req: context.req,
  });

  return sanitizeUser(user);
};

const resetPassword = async (id, newPassword, context = {}) => {
  await getExistingUser(id);

  const hashedPassword = await bcrypt.hash(newPassword, PASSWORD_SALT_ROUNDS);
  const user = await prisma.user.update({
    where: { user_id: Number(id) },
    data: {
      password: hashedPassword,
      is_first_login: true,
    },
    select: userSelect,
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "USER_PASSWORD_RESET",
    entityId: user.user_id,
    metadata: { email: user.email },
    req: context.req,
  });

  return sanitizeUser(user);
};

module.exports = {
  UserManagementError,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  setUserActiveStatus,
  resetPassword,
};
