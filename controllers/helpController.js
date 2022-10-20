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

const getHelpById = async (req, res) => {
  try {
    const getByID = await helpRepo.getById(help_id);
    if (!getByID) return res.respondNotFound(`not found data with help_id =  ${help_id}`);

    return res.respondGet(getByID);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const createHelp = async (req, res) => {
  try {
    const { title, deskription } = req.body;

    const create = await helpRepo.createHelp(req.body);

    return res.respondCreated(create, 'Success created');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const updateHelp = async (req, res) => {
  try {
    const help_id = req.params.id;

    const getByID = await helpRepo.getById(help_id);
    if (!getByID) return res.respondNotFound(`not found data with help_id =  ${help_id}`);

    const updated = await helpRepo.updateHelp(req.body, help_id);

    return res.respondUpdated(updated, 'successfully updated help');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const deleteHelp = async (req, res) => {
  try {
    const help_id = req.params.id;

    const getByID = await helpRepo.getById(help_id);
    if (!getByID) return res.respondNotFound(`not found data with help_id =  ${help_id}`);

    const deleteHelp = await helpRepo.deleteHelp(help_id);

    return res.respondDeleted(deleteHelp, `successfully deleted help_id = ${help_id}`);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

module.exports = {
  getHelp,
  getHelpById,
  createHelp,
  updateHelp,
  deleteHelp,
};
