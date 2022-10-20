const { Help } = require('../models');

const getHelp = async () => {
  try {
    const get = await Help.findAll();

    return get;
  } catch (err) {
    throw err;
  }
};

const getById = async (id) => {
  try {
    const getId = await Help.findOne({ where: { id: id } });

    return getId;
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

const updateHelp = async (input, id) => {
  try {
    const update = await Help.update(input, { where: { id: id } });

    return update;
  } catch (err) {
    throw err;
  }
};

const deleteHelp = async (id) => {
  try {
    const deleted = await Help.destroy({ where: { id: id } });

    return deleted;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getHelp,
  getById,
  updateHelp,
  createHelp,
  deleteHelp,
};
