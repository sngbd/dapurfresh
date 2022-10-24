const { imagekit } = require('../helpers/imagekit');
const userRepository = require('../repository/profileRepository');

const updateProfile = async (req, res) => {
  try {
    const userId = req.user;

    const { name, phone_number, address } = req.body;

    const file = req.file.buffer.toString('base64');
    const namaFile = Date.now() + '-' + req.file.originalname;

    const upload = await imagekit.upload({
      file: file,
      fileName: namaFile,
    });

    let updated = await userRepository.updateUser(
      {
        thumbnail: upload.url,
        name,
        phone_number,
        address,
      },
      userId.id
    );

    let get = await userRepository.getMyProfile(userId.id);

    const data = {
      username: get.username,
      name: get.name,
      phone_number: get.phone_number,
      address: get.address,
      ref_code: get.ref_code,
      ref_code_friend: get.ref_code_friend,
      thumbnail: get.thumbnail,
    };

    return res.respondUpdated(data, 'Success Update Data');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const getMyProfile = async (req, res) => {
  try {
    const myProfile = req.user;

    const findMyProfile = await userRepository.getMyProfile(myProfile.id);

    const data = {
      username: findMyProfile.username,
      name: findMyProfile.name,
      phone_number: findMyProfile.phone_number,
      address: findMyProfile.address,
      ref_code: findMyProfile.ref_code,
      ref_code_friend: findMyProfile.ref_code_friend,
      thumbnail: findMyProfile.thumbnail,
    };

    return res.respondGet(data, 'success get my profile');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

module.exports = {
  updateProfile,
  getMyProfile,
};
