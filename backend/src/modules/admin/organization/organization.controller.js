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
  const organizations = await organizationService.getOrganization();

  res.status(200).json({
    success: true,
    message: "Organizations fetched successfully",
    data: organizations,
  });
});

const getOrganizationById = asyncHandler(async (req, res) => {
  const organization = await organizationService.getOrganizationById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Organization details fetched successfully",
    data: organization,
  });
});

const createOrganization = asyncHandler(async (req, res) => {
  const organization = await organizationService.createOrganization(req.body, getContext(req));

  res.status(201).json({
    success: true,
    message: "Organization created successfully",
    data: organization,
  });
});

const updateOrganization = asyncHandler(async (req, res) => {
  const organization = await organizationService.updateOrganization(req.params.id, req.body, getContext(req));

  res.status(200).json({
    success: true,
    message: "Organization updated successfully",
    data: organization,
  });
});

const uploadLogo = asyncHandler(async (req, res) => {
  const organization = await organizationService.updateOrganizationLogo(req.params.id, req.file, getContext(req));

  res.status(200).json({
    success: true,
    message: "Organization logo uploaded successfully",
    data: organization,
  });
});

const deleteOrganization = asyncHandler(async (req, res) => {
  const result = await organizationService.deleteOrganization(req.params.id, getContext(req));

  res.status(200).json({
    success: true,
    message: "Organization deleted successfully",
    data: result,
  });
});

module.exports = {
  getOrganization,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  uploadLogo,
  deleteOrganization,
};
