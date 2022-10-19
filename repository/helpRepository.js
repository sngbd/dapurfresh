const { Help } = require('../models');

const getHelp = async () => {
  try {
    const get = await Help.findAll();

    return get;
  } catch (err) {
    throw err;
  }
};

const createHelp = async (input) => {
  try {
    const created = await Help.create(input);

    return created;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  getHelp,
  createHelp,
};
