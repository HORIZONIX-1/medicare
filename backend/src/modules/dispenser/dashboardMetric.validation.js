const Joi = require('joi');

const validate = (schema, property = 'body') => (req, _res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  });

  if (error) {
    const validationError = new Error('Validation failed');
    validationError.statusCode = 400;
    validationError.details = error.details.map((detail) => ({ field: detail.path.join('.'), message: detail.message }));
    next(validationError);
    return;
  }

  req[property] = value;
  next();
};

const setMetricSchema = Joi.object({
  key: Joi.string().trim().max(255).required(),
  value: Joi.string().allow('').required(),
  ttlSeconds: Joi.number().integer().min(1).optional(),
});

const keyParamSchema = Joi.object({ key: Joi.string().trim().max(255).required() });

module.exports = { validate, setMetricSchema, keyParamSchema };
