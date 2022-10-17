const { User } = require('../models');
const { Op } = require('sequelize');

const createUser = async (user) => {
  if (user.ref_code_friend) {
    const refCodeFriend = await User.findOne({
      where: { ref_code: user.ref_code_friend },
    });

    if (!refCodeFriend) {
      throw "friend's referral code is invalid";
    }
  }

  const [newUser, created] = await User.findOrCreate({
    where: { username: user.username },
    defaults: user,
  });

  if (created) return newUser;
  throw 'username already exists';
};

module.exports = {
  createUser,
};
