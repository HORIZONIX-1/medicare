const prisma = require("../../../config/prisma");

class AuditLogError extends Error {
  constructor(message, statusCode = 500, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const serializeMetadata = (metadata) => {
  if (!metadata) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(metadata));
};

const createAuditLog = async ({ actorUserId, action, entity, entityId, metadata, req }) => {
  if (!action || !entity) {
    throw new AuditLogError("Audit action and entity are required", 400);
  }

  return prisma.auditLog.create({
    data: {
      actor_user_id: actorUserId || null,
      action,
      entity,
      entity_id: entityId ? String(entityId) : null,
      metadata: serializeMetadata(metadata),
      ip_address: req?.ip || null,
      user_agent: req?.get?.("user-agent") || null,
    },
  });
};

const createAuditLogSafe = async (payload) => {
  try {
    await createAuditLog(payload);
  } catch (error) {
    console.error("Audit log write failed:", error);
  }
};

const sanitizeAuditLog = (log) => ({
  id: log.audit_log_id,
  action: log.action,
  entity: log.entity,
  entityId: log.entity_id,
  metadata: log.metadata,
  ipAddress: log.ip_address,
  userAgent: log.user_agent,
  createdAt: log.created_at,
  actor: log.actor
    ? {
        id: log.actor.user_id,
        name: log.actor.name,
        email: log.actor.email,
        role: log.actor.role,
      }
    : null,
});

const getAuditLogs = async (query) => {
  const page = query.page;
  const limit = query.limit;
  const skip = (page - 1) * limit;
  const where = {};

  if (query.action) {
    where.action = query.action;
  }

  if (query.entity) {
    where.entity = query.entity;
  }

  if (query.actorUserId) {
    where.actor_user_id = query.actorUserId;
  }

  if (query.dateFrom || query.dateTo) {
    where.created_at = {};

    if (query.dateFrom) {
      where.created_at.gte = query.dateFrom;
    }

    if (query.dateTo) {
      where.created_at.lte = query.dateTo;
    }
  }

  if (query.search) {
    where.OR = [
      { action: { contains: query.search } },
      { entity: { contains: query.search } },
      { entity_id: { contains: query.search } },
      {
        actor: {
          OR: [
            { name: { contains: query.search } },
            { email: { contains: query.search } },
          ],
        },
      },
    ];
  }

  const [logs, total] = await prisma.$transaction([
    prisma.auditLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: query.sortOrder },
      select: {
        audit_log_id: true,
        action: true,
        entity: true,
        entity_id: true,
        metadata: true,
        ip_address: true,
        user_agent: true,
        created_at: true,
        actor: {
          select: {
            user_id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    data: logs.map(sanitizeAuditLog),
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

module.exports = {
  AuditLogError,
  createAuditLog,
  createAuditLogSafe,
  getAuditLogs,
};
