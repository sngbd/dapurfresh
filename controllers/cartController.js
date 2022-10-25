const cartRepository = require('../repository/cartRepository');

const addItem = async (req, res) => {
  try {
    const response = await cartRepository.addItemToCart({
      user_id: req.user.id, ...req.body,
    });

    return res.respondCreated(response, 'item added to the cart successfully');
  } catch (err) {
    return res.respond(null, err.message, err.code);
  }
};

const getCart = async (req, res) => {
  try {
    const response = await cartRepository.getCart(req.user.id);

    return res.respondGet(response, 'cart found');
  } catch (err) {
    return res.respond(null, err.message, err.code);
  }
};

const updateItem = async (req, res) => {
  try {
    const response = await cartRepository.updateItem({
      user_id: req.user.id, ...req.body,
    });

    return res.respondUpdated(response, 'item updated successfully');
  } catch (err) {
    return res.respond(null, err.message, err.code);
  }
};

const deleteItem = async (req, res) => {
  try {
    const response = await cartRepository.deleteItem({
      user_id: req.user.id, ...req.body,
    });

    return res.respondDeleted(response, 'item deleted successfully');
  } catch (err) {
    return res.respond(null, err.message, err.code);
  }
};

module.exports = {
  addItem,
  getCart,
  updateItem,
  deleteItem,
};
