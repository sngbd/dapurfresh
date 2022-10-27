const Joi = require("joi");

const validateAddOrder = async (req, res, next) => {
  const schemaOrder = Joi.object({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().required(),
    transaction_date: Joi.date().required(),
    // sub_total: Joi.number().min(0).required(),
    delivery_cost: Joi.number().min(0),
    // total: Joi.number().min(0).required(),
    note: Joi.string(),
    user_id: Joi.number().min(0).required(),
    status: Joi.string().valid("Batal", "Proses").required(),
    // no_order: Joi.string(),
    order_items: Joi.array().items(
      Joi.object().keys({
        product_id: Joi.number().required(),
        qty: Joi.number().required(),
        price: Joi.number().required(),
      }).unknown(true)
    ).unique((a,b) => a.product_id === b.product_id),
  });
  
  try {
    await schemaOrder.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  next();
}

const validateUpdateOrderStatus = async (req, res, next) => {
  const schemaUpdateOrder = Joi.object({
    status: Joi.string().valid("Batal", "Proses").required(),
  });
  try {
    await schemaUpdateOrder.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  next();
}

module.exports = {
  validateAddOrder,
  validateUpdateOrderStatus
};