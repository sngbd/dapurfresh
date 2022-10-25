const { Unit } = require('../models');

const getUnit = async () => {
  const get = await Unit.findAll();

  return get;
};

const getById = async (id) => {
  const getId = await Unit.findOne({ where: { id } });

  return getId;
};

const createUnit = async (input) => {
  const created = await Unit.create(input);

  return created;
};

const updateUnit = async (input, id) => {
  const update = await Unit.update(input, { where: { id } });

  return update;
};

const deleteUnit = async (id) => {
  const deleted = await Unit.destroy({ where: { id } });

  return deleted;
};

module.exports = {
  getUnit,
  getById,
  updateUnit,
  createUnit,
  deleteUnit,
};
