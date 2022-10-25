const { User } = require('../models');

const updateUser = async (input, id) => {
  const update = await User.update(input, { where: { id } });

  return update;
};

const getMyProfile = async (id) => {
  const getProfile = await User.findOne({ where: { id } });

  return getProfile;
};

module.exports = {
  updateUser,
  getMyProfile,
};
