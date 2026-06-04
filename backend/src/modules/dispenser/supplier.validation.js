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

const createSupplierSchema = Joi.object({
  name: Joi.string().trim().max(255).required(),
  email: Joi.string().email().max(255).allow(null, ''),
  phone: Joi.string().max(50).allow(null, ''),
  address: Joi.string().max(1000).allow(null, ''),
  contact_person: Joi.string().max(255).allow(null, ''),
  is_active: Joi.boolean().default(true),
});

const updateSupplierSchema = Joi.object({
  name: Joi.string().trim().max(255),
  email: Joi.string().email().max(255).allow(null, ''),
  phone: Joi.string().max(50).allow(null, ''),
  address: Joi.string().max(1000).allow(null, ''),
  contact_person: Joi.string().max(255).allow(null, ''),
  is_active: Joi.boolean(),
});

const listSuppliersSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(25),
  search: Joi.string().max(255).allow('', null),
});

const idParamSchema = Joi.object({ id: Joi.number().integer().required() });

module.exports = { validate, createSupplierSchema, updateSupplierSchema, listSuppliersSchema, idParamSchema };
