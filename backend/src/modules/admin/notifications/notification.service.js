const prisma = require("../../../config/prisma");

class NotificationError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

const getNotifications = async (query, actorId) => {
  const page = Number.parseInt(query.page || "1", 10);
  const limit = Number.parseInt(query.limit || "20", 10);
  const skip = (page - 1) * limit;
  const where = {};

  if (query.isRead !== undefined) {
    where.is_read = query.isRead === "true" || query.isRead === true;
  }

  // Allow targeted notifications if we want, or general system broadcast (user_id is null)
  where.OR = [
    { user_id: null },
    { user_id: Number(actorId) }
  ];

  const [notifications, total] = await prisma.$transaction([
    prisma.notification.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
    }),
    prisma.notification.count({ where }),
  ]);

  return {
    data: notifications.map((n) => ({
      id: n.notification_id,
      title: n.title,
      message: n.message,
      type: n.type,
      isRead: n.is_read,
      createdAt: n.created_at,
      userId: n.user_id,
    })),
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

const markAsRead = async (id, actorId) => {
  const notification = await prisma.notification.findUnique({
    where: { notification_id: Number(id) },
  });

  if (!notification) {
    throw new NotificationError("Notification not found", 404);
  }

  // Ensure targeted notification is owned by this user
  if (notification.user_id && notification.user_id !== Number(actorId)) {
    throw new NotificationError("Unauthorized access", 403);
  }

  const updated = await prisma.notification.update({
    where: { notification_id: Number(id) },
    data: { is_read: true },
  });

  return {
    id: updated.notification_id,
    isRead: updated.is_read,
  };
};

const markAllAsRead = async (actorId) => {
  const result = await prisma.notification.updateMany({
    where: {
      is_read: false,
      OR: [
        { user_id: null },
        { user_id: Number(actorId) }
      ]
    },
    data: { is_read: true },
  });

  return {
    count: result.count,
    success: true,
  };
};

const createSystemNotification = async ({ title, message, type = "SYSTEM", userId = null }) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type,
        user_id: userId ? Number(userId) : null,
      },
    });
    return notification;
  } catch (error) {
    console.error("Failed to create system notification:", error);
    return null;
  }
};

module.exports = {
  NotificationError,
  getNotifications,
  markAsRead,
  markAllAsRead,
  createSystemNotification,
};
