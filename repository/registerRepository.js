const { User } = require('../models');

const createUser = (async (user) => {
  const [newUser, created] = await User.findOrCreate({
    where: { username: user.username },
    defaults: user
  })
  
  if (created) return newUser;
  throw 'username already exists'
});

module.exports = {
  createUser,
}
