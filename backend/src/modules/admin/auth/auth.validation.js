const Joi = require("joi");

const validate = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const validationError = new Error("Validation failed");
    validationError.statusCode = 400;
    validationError.details = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    next(validationError);
    return;
  }

  req.body = value;
  next();
};

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "A valid email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "any.required": "Password is required",
  }),
});

const logoutSchema = Joi.object({
  refreshToken: Joi.string().optional(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().optional(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "any.required": "Current password is required",
  }),
  newPassword: Joi.string()
    .min(8)
    .pattern(/[a-z]/, "lowercase letter")
    .pattern(/[A-Z]/, "uppercase letter")
    .pattern(/[0-9]/, "number")
    .required()
    .messages({
      "string.min": "New password must be at least 8 characters",
      "string.pattern.name": "New password must contain at least one {#name}",
      "any.required": "New password is required",
    }),
});

module.exports = {
  validate,
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  changePasswordSchema,
};
