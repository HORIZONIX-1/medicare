const VALID_ROLES = Object.freeze(["ADMIN", "DOCTOR", "RECEPTIONIST", "DISPENSER"]);

class RoleError extends Error {
  constructor(message, statusCode = 403) {
    super(message);
    this.statusCode = statusCode;
  }
}

const normalizeRoles = (roles) => roles.flat().filter(Boolean);

const requireRoles = (...roles) => {
  const allowedRoles = normalizeRoles(roles);
  const invalidRoles = allowedRoles.filter((role) => !VALID_ROLES.includes(role));

  if (invalidRoles.length > 0) {
    throw new RoleError(`Invalid role configuration: ${invalidRoles.join(", ")}`, 500);
  }

  return (req, _res, next) => {
    try {
      if (!req.user) {
        const error = new RoleError("Authentication is required", 401);
        next(error);
        return;
      }

      if (allowedRoles.length === 0) {
        next();
        return;
      }

      if (!allowedRoles.includes(req.user.role)) {
        const error = new RoleError("You do not have permission to access this resource");
        next(error);
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  VALID_ROLES,
  RoleError,
  requireRoles,
  roleMiddleware: requireRoles,
};
