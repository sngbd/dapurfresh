const bcrypt = require('bcrypt');
const registerRepository = require('../repository/registerRepository');

const postUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(req.body.password, saltRounds);
  
    delete req.body.password;
    req.body.password_hash = password_hash;

    const { id } = await registerRepository.createUser(req.body);
    
    delete req.body.password_hash;
    
    res.respondCreated({ id, ...req.body }, 'user successfully registered');
  } catch (err) {
    return res.respondServerError(null, err);
  }
};

module.exports = {
  postUser,
};
