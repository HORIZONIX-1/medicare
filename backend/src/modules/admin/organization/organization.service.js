const prisma = require("../../../config/prisma");

const DEFAULT_ORGANIZATION_NAME = process.env.DEFAULT_ORGANIZATION_NAME || "Medical Center";

class OrganizationError extends Error {
  constructor(message, statusCode = 500, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const writeAuditLog = async ({ actorId, action, organizationId, metadata, req }) => {
  try {
    await prisma.auditLog.create({
      data: {
        actor_user_id: actorId || null,
        action,
        entity: "Organization",
        entity_id: organizationId ? String(organizationId) : null,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
        ip_address: req?.ip || null,
        user_agent: req?.get?.("user-agent") || null,
      },
    });
  } catch (error) {
    console.error("Audit log write failed:", error);
  }
};

const getOrganization = async () => {
  let organizations = await prisma.organization.findMany({
    orderBy: { organization_id: "asc" },
    include: {
      _count: {
        select: {
          users: true,
          patients: true,
        },
      },
    },
  });

  if (organizations.length === 0) {
    await prisma.organization.create({
      data: {
        name: DEFAULT_ORGANIZATION_NAME,
      },
    });
    
    organizations = await prisma.organization.findMany({
      orderBy: { organization_id: "asc" },
      include: {
        _count: {
          select: {
            users: true,
            patients: true,
          },
        },
      },
    });
  }

  return organizations.map(org => ({
    id: org.organization_id,
    name: org.name,
    email: org.email,
    phone: org.phone,
    address: org.address,
    website: org.website,
    logoUrl: org.logo_url,
    description: org.description,
    createdAt: org.created_at,
    updatedAt: org.updated_at,
    usersCount: org._count.users,
    patientsCount: org._count.patients,
  }));
};

const getOrganizationById = async (organizationId) => {
  const org = await prisma.organization.findUnique({
    where: { organization_id: Number(organizationId) },
    include: {
      _count: {
        select: {
          users: true,
          patients: true,
        },
      },
    },
  });

  if (!org) {
    throw new OrganizationError("Organization not found", 404);
  }

  return {
    id: org.organization_id,
    name: org.name,
    email: org.email,
    phone: org.phone,
    address: org.address,
    website: org.website,
    logoUrl: org.logo_url,
    description: org.description,
    createdAt: org.created_at,
    updatedAt: org.updated_at,
    usersCount: org._count.users,
    patientsCount: org._count.patients,
  };
};

const createOrganization = async (payload, context = {}) => {
  const org = await prisma.organization.create({
    data: {
      name: payload.name,
      email: payload.email || null,
      phone: payload.phone || null,
      address: payload.address || null,
      website: payload.website || null,
      description: payload.description || null,
    },
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "ORGANIZATION_CREATED",
    organizationId: org.organization_id,
    metadata: { name: org.name },
    req: context.req,
  });

  return {
    id: org.organization_id,
    name: org.name,
    email: org.email,
    phone: org.phone,
    address: org.address,
    website: org.website,
    logoUrl: org.logo_url,
    description: org.description,
    createdAt: org.created_at,
    updatedAt: org.updated_at,
    usersCount: 0,
    patientsCount: 0,
  };
};

const updateOrganization = async (organizationId, payload, context = {}) => {
  const data = {};

  if (payload.name !== undefined) data.name = payload.name;
  if (payload.email !== undefined) data.email = payload.email || null;
  if (payload.phone !== undefined) data.phone = payload.phone || null;
  if (payload.address !== undefined) data.address = payload.address || null;
  if (payload.website !== undefined) data.website = payload.website || null;
  if (payload.description !== undefined) data.description = payload.description || null;

  const updated = await prisma.organization.update({
    where: { organization_id: Number(organizationId) },
    data,
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "ORGANIZATION_UPDATED",
    organizationId: updated.organization_id,
    metadata: { changedFields: Object.keys(data) },
    req: context.req,
  });

  return getOrganizationById(updated.organization_id);
};

const updateOrganizationLogo = async (organizationId, file, context = {}) => {
  if (!file) {
    throw new OrganizationError("Organization logo is required", 400);
  }

  const logoUrl = `/uploads/organization/${file.filename}`;

  const updated = await prisma.organization.update({
    where: { organization_id: Number(organizationId) },
    data: { logo_url: logoUrl },
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "ORGANIZATION_LOGO_UPDATED",
    organizationId: updated.organization_id,
    metadata: { logoUrl },
    req: context.req,
  });

  return getOrganizationById(updated.organization_id);
};

const deleteOrganization = async (organizationId, context = {}) => {
  const org = await prisma.organization.findUnique({
    where: { organization_id: Number(organizationId) },
  });

  if (!org) {
    throw new OrganizationError("Organization not found", 404);
  }

  await prisma.organization.delete({
    where: { organization_id: org.organization_id },
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "ORGANIZATION_DELETED",
    organizationId: org.organization_id,
    metadata: { name: org.name },
    req: context.req,
  });

  return {
    id: org.organization_id,
    name: org.name,
    message: "Organization deleted successfully",
  };
};

module.exports = {
  OrganizationError,
  getOrganization,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  updateOrganizationLogo,
  deleteOrganization,
};
