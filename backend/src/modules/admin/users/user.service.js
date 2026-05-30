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
};

const sanitizeUser = (user) => ({
  id: user.user_id,
  name: user.name,
  email: user.email,
  role: user.role,
  isFirstLogin: user.is_first_login,
  isActive: user.is_active,
  createdAt: user.created_at,
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
    },
    select: userSelect,
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "USER_CREATED",
    entityId: user.user_id,
    metadata: { role: user.role, email: user.email },
    req: context.req,
  });

  return sanitizeUser(user);
};

const getUsers = async (query) => {
  const page = query.page;
  const limit = query.limit;
  const skip = (page - 1) * limit;
  const where = {};

  if (query.role) {
    where.role = query.role;
  }

  if (typeof query.isActive === "boolean") {
    where.is_active = query.isActive;
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
      orderBy: { [query.sortBy]: query.sortOrder },
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
