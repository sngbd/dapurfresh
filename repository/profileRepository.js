const { User } = require('../models');

const updateUser = async (input, id) => {
  try {
    const update = await User.findOne(input, { where: { id: id } });

    return update;
  } catch (err) {
    throw err;
  }
};

const getMyProfile = async (id) => {
  try {
    const getProfile = await User.findOne({ where: { id: id } });

    return getProfile;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  updateUser,
  getMyProfile,
};
