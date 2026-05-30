const Joi = require("joi");

const roles = ["ADMIN", "DOCTOR", "RECEPTIONIST", "DISPENSER"];

const validate = (schema, property = "body") => (req, _res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
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

  req[property] = value;
  next();
};

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const listUsersSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().trim().max(100).allow(""),
  role: Joi.string().valid(...roles),
  isActive: Joi.boolean(),
  includeDeleted: Joi.boolean().default(false),
  sortBy: Joi.string().valid("name", "email", "role", "created_at").default("created_at"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
});

const passwordSchema = Joi.string()
  .min(8)
  .pattern(/[a-z]/, "lowercase letter")
  .pattern(/[A-Z]/, "uppercase letter")
  .pattern(/[0-9]/, "number")
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters",
    "string.pattern.name": "Password must contain at least one {#name}",
  });

const createUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: passwordSchema,
  role: Joi.string().valid(...roles).required(),
  isActive: Joi.boolean().default(true),
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  email: Joi.string().trim().lowercase().email(),
  role: Joi.string().valid(...roles),
  isActive: Joi.boolean(),
}).min(1);

const activationSchema = Joi.object({
  isActive: Joi.boolean().required(),
});

const resetPasswordSchema = Joi.object({
  newPassword: passwordSchema,
});

module.exports = {
  validate,
  idParamSchema,
  listUsersSchema,
  createUserSchema,
  updateUserSchema,
  activationSchema,
  resetPasswordSchema,
};
