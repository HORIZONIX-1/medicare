const Joi = require("joi");

const createTicketSchema = Joi.object({
  subject: Joi.string().trim().min(3).max(150).required(),
  message: Joi.string().trim().min(10).max(1000).required(),
});

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

module.exports = {
  validate,
  createTicketSchema,
};
