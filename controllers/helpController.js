const helpRepo = require('../repository/helpRepository');

const getHelp = async (req, res) => {
  try {
    const get = await helpRepo.getHelp();

    return res.respondGet(get);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

module.exports = {
  getHelp,
};
