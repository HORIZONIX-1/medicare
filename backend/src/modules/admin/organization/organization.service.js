const prisma = require("../../../config/prisma");

const DEFAULT_ORGANIZATION_NAME = process.env.DEFAULT_ORGANIZATION_NAME || "Medical Center";

class OrganizationError extends Error {
  constructor(message, statusCode = 500, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const sanitizeOrganization = (organization) => ({
  id: organization.organization_id,
  name: organization.name,
  email: organization.email,
  phone: organization.phone,
  address: organization.address,
  website: organization.website,
  logoUrl: organization.logo_url,
  description: organization.description,
  createdAt: organization.created_at,
  updatedAt: organization.updated_at,
});

const getOrganizationRecord = async () => {
  const organization = await prisma.organization.findFirst({
    orderBy: { organization_id: "asc" },
  });

  if (organization) {
    return organization;
  }

  return prisma.organization.create({
    data: {
      name: DEFAULT_ORGANIZATION_NAME,
    },
  });
};

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

const getOrganization = async () => sanitizeOrganization(await getOrganizationRecord());

const updateOrganization = async (payload, context = {}) => {
  const organization = await getOrganizationRecord();
  const data = {};

  if (payload.name !== undefined) data.name = payload.name;
  if (payload.email !== undefined) data.email = payload.email || null;
  if (payload.phone !== undefined) data.phone = payload.phone || null;
  if (payload.address !== undefined) data.address = payload.address || null;
  if (payload.website !== undefined) data.website = payload.website || null;
  if (payload.description !== undefined) data.description = payload.description || null;

  const updated = await prisma.organization.update({
    where: { organization_id: organization.organization_id },
    data,
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "ORGANIZATION_UPDATED",
    organizationId: updated.organization_id,
    metadata: { changedFields: Object.keys(data) },
    req: context.req,
  });

  return sanitizeOrganization(updated);
};

const updateOrganizationLogo = async (file, context = {}) => {
  if (!file) {
    throw new OrganizationError("Organization logo is required", 400);
  }

  const organization = await getOrganizationRecord();
  const logoUrl = `/uploads/organization/${file.filename}`;

  const updated = await prisma.organization.update({
    where: { organization_id: organization.organization_id },
    data: { logo_url: logoUrl },
  });

  await writeAuditLog({
    actorId: context.actorId,
    action: "ORGANIZATION_LOGO_UPDATED",
    organizationId: updated.organization_id,
    metadata: { logoUrl },
    req: context.req,
  });

  return sanitizeOrganization(updated);
};

module.exports = {
  OrganizationError,
  getOrganization,
  updateOrganization,
  updateOrganizationLogo,
};
