const prisma = require("../../../config/prisma");

const staffRoles = ["RECEPTIONIST", "DISPENSER"];

const getDashboardStats = async () => {
  const [totalDoctors, totalStaff, totalPatients, activeUsers, inactiveUsers] = await prisma.$transaction([
    prisma.user.count({
      where: {
        role: "DOCTOR",
      },
    }),
    prisma.user.count({
      where: {
        role: { in: staffRoles },
      },
    }),
    prisma.patient.count(),
    prisma.user.count({
      where: {
        is_active: true,
      },
    }),
    prisma.user.count({
      where: {
        is_active: false,
      },
    }),
  ]);

  return {
    users: {
      totalDoctors,
      totalStaff,
      activeUsers,
      inactiveUsers,
    },
    patients: {
      totalPatients,
    },
  };
};

const getRecentActivities = async (options = {}) => {
  const limit = Math.min(Number.parseInt(options.limit || "10", 10), 50);

  const activities = await prisma.auditLog.findMany({
    take: Number.isNaN(limit) || limit < 1 ? 10 : limit,
    orderBy: {
      created_at: "desc",
    },
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
  });

  return activities.map((activity) => ({
    id: activity.audit_log_id,
    action: activity.action,
    entity: activity.entity,
    entityId: activity.entity_id,
    metadata: activity.metadata,
    ipAddress: activity.ip_address,
    userAgent: activity.user_agent,
    createdAt: activity.created_at,
    actor: activity.actor
      ? {
          id: activity.actor.user_id,
          name: activity.actor.name,
          email: activity.actor.email,
          role: activity.actor.role,
        }
      : null,
  }));
};

module.exports = {
  getDashboardStats,
  getRecentActivities,
};
