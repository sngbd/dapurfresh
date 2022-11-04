const Joi = require('joi');

const addUpdateProduct = async (req, res, next) => {
  const schema = Joi.object({
    category_id: Joi.number().required(),
    price: Joi.number().positive().required(),
    qty_unit: Joi.number().positive(),
    title: Joi.string().min(2).regex(/[A-Z]/, 'uppercase').regex(/[a-z]/, 'lowercase')
      .regex(/[^\w]/, 'special character')
      .required(),
    stock: Joi.number().positive().required(),
    unit_id: Joi.number().positive().required(),
    info:Joi.string(),
    thumbnail: Joi.string()
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  return next();
};

module.exports = {
  addUpdateProduct
}
