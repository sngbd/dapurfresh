const unitRepo = require('../repository/unitRepository');
const getUnit = async (req, res) => {
  try {
    const get = await unitRepo.getUnit();

    return res.respondGet(get);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const getUnitById = async (req, res) => {
  try {
    const unit_id = req.params.id;

    const getByID = await unitRepo.getById(unit_id);
    if (!getByID) return res.respondNotFound(`not found data with unit_id =  ${unit_id}`);

    return res.respondGet(getByID);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const createUnit = async (req, res) => {
  try {
    const { title } = req.body;
    const create = await unitRepo.createUnit({
      title: title,
    });

    return res.respondCreated(create, 'Success created');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const updateUnit = async (req, res) => {
  try {
    const unit_id = req.params.id;

    const getByID = await unitRepo.getById(unit_id);
    if (!getByID) return res.respondNotFound(`not found data with unit_id =  ${unit_id}`);

    const updated = await unitRepo.updateUnit(req.body, unit_id);

    return res.respondUpdated(updated, 'successfully updated Unit');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const deleteUnit = async (req, res) => {
  try {
    const unit_id = req.params.id;

    const getByID = await unitRepo.getById(unit_id);
    if (!getByID) return res.respondNotFound(`not found data with unit_id =  ${unit_id}`);

    const deleteUnit = await unitRepo.deleteUnit(unit_id);

    return res.respondDeleted(deleteUnit, `successfully deleted unit_id = ${unit_id}`);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

module.exports = {
  getUnit,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
};
