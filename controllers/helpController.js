const helpRepo = require('../repository/helpRepository');
const { Help } = require('../models');

const getHelp = async (req, res) => {
  try {
    const get = await helpRepo.getHelp();

    return res.respondGet(get);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const createHelp = async (req, res) => {
  try {
    const { title, deskription } = req.body;

    // const create = await Help.create({
    //   title: title,
    //   deskription: deskription,
    // });

    const create = await helpRepo.createHelp(req.body);

    return res.respondCreated(create, 'Success created');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

module.exports = {
  getHelp,
  createHelp,
};
