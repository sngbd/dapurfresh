const { customAlphabet } = require('nanoid');
const { User } = require('../models');

const error = new Error();

const generateRefCode = async () => {
  const nanoid = customAlphabet(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    8,
  );
  const refCode = nanoid();

  const user = await find({ ref_code: refCode })
  if (user[0]) return generateRefCode();

  return refCode;
}

const createUser = async (user) => {
  error.code = 400;

  if (user.ref_code_friend) {
    const refCodeFriend = await User.findOne({
      where: { ref_code: user.ref_code_friend },
    });

    if (!refCodeFriend) {
      error.message = "friend's referral code is invalid";
      throw error;
    }
  }

  user.ref_code = await generateRefCode();

  const [newUser, created] = await User.findOrCreate({
    where: { username: user.username },
    defaults: user,
  });

  if (created) return newUser;
  error.message = 'username already exists';
  throw error;
};

const find = async (json) => {
  try {
    const rows = await User.findAll({
      where: json,
    });
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  find,
};
