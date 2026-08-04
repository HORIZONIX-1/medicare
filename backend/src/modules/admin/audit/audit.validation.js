const Joi = require("joi");

const validate = (schema, property = "query") => (req, _res, next) => {
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

const listAuditLogsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  action: Joi.string().trim().max(100),
  entity: Joi.string().trim().max(100),
  actorUserId: Joi.number().integer().positive(),
  search: Joi.string().trim().max(100).allow(""),
  dateFrom: Joi.date().iso(),
  dateTo: Joi.date().iso().min(Joi.ref("dateFrom")),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
});

module.exports = {
  validate,
  listAuditLogsSchema,
};
