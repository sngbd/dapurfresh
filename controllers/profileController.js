const { imagekit } = require('../helpers/imagekit');
const bcrypt = require('bcrypt');

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let query = {
      where: {
        id: userId,
      },
    };

    const { name, phone_number, address } = req.body;

    const file = req.file.buffer.toString('base64');
    const namaFile = Date.now() + '-' + req.file.originalname;

    const upload = await imagekit.upload({
      file: file,
      fileName: namaFile,
    });

    let updated = await User.update(
      {
        thumbnail: upload.url,
        name,
        phone_number,
        address,
      },
      query
    );
    return res.respondUpdated({ updated }, 'Success Update Data');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};
const getMyProfile = async (req, res) => {
  try {
    const myProfile = req.user;

    const findMyProfile = await User.findOne({ where: { id: myProfile.id } });
    return res.respondGet(findMyProfile, 'success get my profile');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

module.exports = {
  updateProfile,
  getMyProfile,
};
