const notificationService = require("./notification.service");

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const getActorId = (req) => req.user?.id || req.admin?.user?.id || null;

const getNotifications = asyncHandler(async (req, res) => {
  const actorId = getActorId(req);
  const result = await notificationService.getNotifications(req.query, actorId);

  res.status(200).json({
    success: true,
    message: "Notifications fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const markAsRead = asyncHandler(async (req, res) => {
  const actorId = getActorId(req);
  const result = await notificationService.markAsRead(req.params.id, actorId);

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: result,
  });
});

const markAllAsRead = asyncHandler(async (req, res) => {
  const actorId = getActorId(req);
  const result = await notificationService.markAllAsRead(actorId);

  res.status(200).json({
    success: true,
    message: `${result.count} notifications marked as read`,
    data: result,
  });
});

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
