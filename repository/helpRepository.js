const { Help } = require('../models');

const getHelp = async () => {
  try {
    const get = await Help.findAll();

    return get;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getHelp,
};
