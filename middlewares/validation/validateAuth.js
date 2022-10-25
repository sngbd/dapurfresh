const Joi = require('joi');

const registerUser = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string(),
    password: Joi.string().min(6).regex(/[A-Z]/, 'uppercase').regex(/[a-z]/, 'lowercase')
      .regex(/[^\w]/, 'special character')
      .required(),
    phone_number: Joi.string().regex(/^\d+$/, 'number'),
    address: Joi.string(),
    ref_code_friend: Joi.string(),
    thumbnail: Joi.string(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  return next();
};

const loginUser = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.respondBadRequest(err.details[0].message);
  }
  return next();
};

module.exports = {
  registerUser,
  loginUser,
};
