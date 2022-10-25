const Joi = require('joi');

const created = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  return next();
};

module.exports = {
  created,
};
