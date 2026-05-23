const dashboardService = require("./dashboard.service");

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const getStats = asyncHandler(async (_req, res) => {
  const stats = await dashboardService.getDashboardStats();

  res.status(200).json({
    success: true,
    message: "Dashboard statistics fetched successfully",
    data: stats,
  });
});

const getActivities = asyncHandler(async (req, res) => {
  const activities = await dashboardService.getRecentActivities(req.query);

  res.status(200).json({
    success: true,
    message: "Recent activities fetched successfully",
    data: activities,
  });
});

module.exports = {
  getStats,
  getActivities,
};
