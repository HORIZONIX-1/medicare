const auditService = require("./audit.service");

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const getAuditLogs = asyncHandler(async (req, res) => {
  const result = await auditService.getAuditLogs(req.query);

  res.status(200).json({
    success: true,
    message: "Audit logs fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

module.exports = {
  getAuditLogs,
};
