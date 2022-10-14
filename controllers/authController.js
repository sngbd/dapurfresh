const { customAlphabet } = require('nanoid');
const bcrypt = require('bcrypt');
const registerRepository = require('../repository/authRepository');

const postUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(req.body.password, saltRounds);

    delete req.body.password;
    req.body.password_hash = password_hash;

    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);
    req.body.ref_code = nanoid();

    const { id } = await registerRepository.createUser(req.body);

    delete req.body.password_hash;
    const { ref_code, ref_code_friend, thumbnail, ...body } = req.body;
    const response = { id, ...body, ref_code, ref_code_friend, thumbnail };

    return res.respondCreated(response, 'user successfully registered');
  } catch (err) {
    return res.respond(null, err.message, err.code);
  }
};

module.exports = {
  postUser,
};
