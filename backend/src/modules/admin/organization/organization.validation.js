const Joi = require("joi");

const validate = (schema, property = "body") => (req, _res, next) => {
  const { error, value } = schema.validate(req[property], {
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

  req[property] = value;
  next();
};

const updateOrganizationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150),
  email: Joi.string().trim().lowercase().email().allow(null, ""),
  phone: Joi.string().trim().max(30).allow(null, ""),
  address: Joi.string().trim().max(255).allow(null, ""),
  website: Joi.string().trim().uri({ scheme: ["http", "https"] }).allow(null, ""),
  description: Joi.string().trim().max(500).allow(null, ""),
}).min(1);

module.exports = {
  validate,
  updateOrganizationSchema,
};
