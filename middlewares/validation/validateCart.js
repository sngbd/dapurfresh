const Joi = require('joi');

const addUpdateItem = async (req, res, next) => {
  const schema = Joi.object({
    product_id: Joi.number().required(),
    qty: Joi.number().positive().required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  next();
};

const deleteItem = async (req, res, next) => {
  const schema = Joi.object({
    product_id: Joi.number().positive().required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  next();
}

module.exports = {
  addUpdateItem,
  deleteItem,
};

