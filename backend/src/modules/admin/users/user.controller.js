const userService = require("./user.service");

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const getActorId = (req) => req.user?.id || req.admin?.user?.id || null;

const getContext = (req) => ({
  actorId: getActorId(req),
  req,
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body, getContext(req));

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: { user },
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const result = await userService.getUsers(req.query);

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: { user },
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body, getContext(req));

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: { user },
  });
});

const softDeleteUser = asyncHandler(async (req, res) => {
  const user = await userService.softDeleteUser(req.params.id, getContext(req));

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: { user },
  });
});

const setUserActiveStatus = asyncHandler(async (req, res) => {
  const user = await userService.setUserActiveStatus(req.params.id, req.body.isActive, getContext(req));

  res.status(200).json({
    success: true,
    message: req.body.isActive ? "User activated successfully" : "User deactivated successfully",
    data: { user },
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const user = await userService.resetPassword(req.params.id, req.body.newPassword, getContext(req));

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
    data: { user },
  });
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  setUserActiveStatus,
  resetPassword,
};
