const { Help } = require('../models');

const getHelp = async () => {
  const get = await Help.findAll();

  return get;
};

const getById = async (id) => {
  const getId = await Help.findOne({ where: { id } });

  return getId;
};

const createHelp = async (input) => {
  const created = await Help.create(input);

  return created;
};

const updateHelp = async (input, id) => {
  const update = await Help.update(input, { where: { id } });

  return update;
};

const deleteHelp = async (id) => {
  const deleted = await Help.destroy({ where: { id } });

  return deleted;
};

module.exports = {
  getHelp,
  getById,
  updateHelp,
  createHelp,
  deleteHelp,
};
