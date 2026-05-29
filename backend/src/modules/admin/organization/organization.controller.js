const organizationService = require("./organization.service");

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const getActorId = (req) => req.user?.id || req.admin?.user?.id || null;

const getContext = (req) => ({
  actorId: getActorId(req),
  req,
});

const getOrganization = asyncHandler(async (_req, res) => {
  const organization = await organizationService.getOrganization();

  res.status(200).json({
    success: true,
    message: "Organization details fetched successfully",
    data: { organization },
  });
});

const updateOrganization = asyncHandler(async (req, res) => {
  const organization = await organizationService.updateOrganization(req.body, getContext(req));

  res.status(200).json({
    success: true,
    message: "Organization updated successfully",
    data: { organization },
  });
});

const uploadLogo = asyncHandler(async (req, res) => {
  const organization = await organizationService.updateOrganizationLogo(req.file, getContext(req));

  res.status(200).json({
    success: true,
    message: "Organization logo uploaded successfully",
    data: { organization },
  });
});

module.exports = {
  getOrganization,
  updateOrganization,
  uploadLogo,
};
