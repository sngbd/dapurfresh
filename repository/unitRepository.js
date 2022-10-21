const { Unit } = require('../models');

const getUnit = async () => {
  try {
    const get = await Unit.findAll();

    return get;
  } catch (err) {
    throw err;
  }
};

const getById = async (id) => {
  try {
    const getId = await Unit.findOne({ where: { id: id } });

    return getId;
  } catch (err) {
    throw err;
  }
};

const createUnit = async (input) => {
  try {
    const created = await Unit.create(input);

    return created;
  } catch (err) {
    throw err;
  }
};

const updateUnit = async (input, id) => {
  try {
    const update = await Unit.update(input, { where: { id: id } });

    return update;
  } catch (err) {
    throw err;
  }
};

const deleteUnit = async (id) => {
  try {
    const deleted = await Unit.destroy({ where: { id: id } });

    return deleted;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUnit,
  getById,
  updateUnit,
  createUnit,
  deleteUnit,
};
