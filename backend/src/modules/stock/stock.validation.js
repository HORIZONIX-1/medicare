const Joi = require("joi");

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
      field: detail.path.join('.'),
      message: detail.message,
    }));

    next(validationError);
    return;
  }

  req[property] = value;
  next();
};

const createStockSchema = Joi.object({
  drug_id: Joi.number().integer().required(),
  batch_number: Joi.string().max(100).allow('', null),
  expiry_date: Joi.date().iso().allow(null),
  quantity: Joi.number().integer().min(1).required(),
  buying_price: Joi.number().precision(2).min(0).required(),
  selling_price: Joi.number().precision(2).min(0).required(),
  status: Joi.string().valid('ACTIVE','EXPIRED','DAMAGED','RECALLED'),
  warehouse_location: Joi.string().max(255).allow('', null),
  supplier_id: Joi.number().integer().positive().allow(null),
});

const updateStockSchema = Joi.object({
  batch_number: Joi.string().max(100).allow('', null),
  expiry_date: Joi.date().iso().allow(null),
  quantity: Joi.number().integer().min(0),
  buying_price: Joi.number().precision(2).min(0),
  selling_price: Joi.number().precision(2).min(0),
  status: Joi.string().valid('ACTIVE','EXPIRED','DAMAGED','RECALLED'),
  warehouse_location: Joi.string().max(255).allow('', null),
  supplier_id: Joi.number().integer().positive().allow(null),
});

const adjustStockSchema = Joi.object({
  adjustmentType: Joi.string().valid('ADD','REMOVE').required(),
  quantity: Joi.number().integer().min(1).required(),
  reason: Joi.string().max(500).allow('', null),
});

const transferStockSchema = Joi.object({
  toBatchId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const bulkPricesSchema = Joi.object({
  updates: Joi.array().items(Joi.object({ batchId: Joi.number().integer().required(), buyingPrice: Joi.number().precision(2).min(0).optional(), sellingPrice: Joi.number().precision(2).min(0).optional() })).required(),
});

module.exports = {
  validate,
  createStockSchema,
  updateStockSchema,
  adjustStockSchema,
  transferStockSchema,
  bulkPricesSchema,
};
