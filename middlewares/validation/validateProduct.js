const Joi = require('joi');

const addUpdateProduct = async (req, res, next) => {
  const schema = Joi.object({
    category_id: Joi.number().required(),
    title: Joi.string().min(6).regex(/[A-Z]/, 'uppercase').regex(/[a-z]/, 'lowercase')
      .regex(/[^\w]/, 'special character')
      .required(),
    product_id: Joi.number().required(),
    stock: Joi.number().positive().required(),
    unit_id: Joi.number().positive()
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
