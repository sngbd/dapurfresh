const Joi = require('joi');

const registerUser = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .required(),
    name: Joi.string(),
    password: Joi.string()
      .min(6)
      .regex(/[A-Z]/, 'uppercase')
      .regex(/[a-z]/, 'lowercase')
      .regex(/[^\w]/, 'special character')
      .required(),
    phone_number: Joi.string()
      .regex(/^\d+$/, 'number'),
    address: Joi.string(),
    ref_code_friend: Joi.string(),
    thumbnail: Joi.string(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details.map((e) => e.message));
  }
  next();
};

module.exports = {
  registerUser,
}