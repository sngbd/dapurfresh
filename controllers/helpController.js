const helpRepo = require('../repository/helpRepository');

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
    const help_id = req.params.id;

    const getByID = await helpRepo.getById(help_id);
    if (!getByID) return res.respondNotFound(`not found data with help_id =  ${help_id}`);

    return res.respondGet(getByID);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const createHelp = async (req, res) => {
  try {
    const { title, description } = req.body;

    const create = await helpRepo.createHelp({
      title,
      description,
    });

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

    const { title, description } = req.body;

    const updated = await helpRepo.updateHelp(
      {
        title,
        description,
      },
      help_id,
    );

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

    const delHelp = await helpRepo.deleteHelp(help_id);

    return res.respondDeleted(delHelp, `successfully deleted help_id = ${help_id}`);
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
