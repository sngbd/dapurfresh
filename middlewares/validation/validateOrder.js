const Joi = require('joi');

const validateAddOrder = async (req, res, next) => {
  const schemaOrder = Joi.object({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().required(),
    // transaction_date: Joi.date().required(),
    sub_total: Joi.number().min(0).required(),
    delivery_cost: Joi.number().min(0).required(),
    total: Joi.number().min(0).required(),
    note: Joi.string().default('-'),
    // user_id: Joi.number().min(0).required(),
    // status: Joi.string().valid('Batal', 'Proses').required(),
    // no_order: Joi.string(),
    order_items: Joi.array().items(
      Joi.object().keys({
        product_id: Joi.number().required(),
        qty: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
        discount: Joi.number().min(0).required(),
      }).unknown(true),
    ).unique((a, b) => a.product_id === b.product_id),
  });

  try {
    await schemaOrder.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  return next();
};

const validateUpdateOrder = async (req, res, next) => {
  const schemaUpdateOrder = Joi.object({
    status: Joi.string().required(),
  });

  try {
    await schemaUpdateOrder.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  return next();
};

module.exports = {
  validateAddOrder,
  validateUpdateOrder,
};
