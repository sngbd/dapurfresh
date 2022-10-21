const { CartItem, Product } = require('../models');

const error = new Error();
error.code = 400;

const addItemToCart = (async (item) => {
  const product = await Product.findOne({
    where: { id: item.product_id },
  });
  
  if (!product) {
    error.message = 'invalid product_id';
    throw error
  } else if (item.qty > product.stock) {
    error.message = 'qty exceeds product\'s stock';
    throw error
  }

  const [newItem, created] = await CartItem.findOrCreate({
    where: { 
      user_id: item.user_id,
      product_id: item.product_id,
    },
    defaults: item,
  });
  
  if (created) return newItem;
  error.message = 'item already added';
  throw error;
});

const getCart = (async (user_id) => {
  const allItem = await CartItem.findAll({
    where: { user_id },
  });

  if (allItem.length) return allItem;
  error.message = 'cart not found'
  throw error;
});

const updateItem = (async (item) => {
  const cartItem = await CartItem.findOne({
    where: {
      user_id: item.user_id,
      product_id: item.product_id
    },
  });
  
  if (!cartItem) {
    error.message = 'product_id not found on cart';
    throw error
  } 

  const product = await Product.findOne({
    where: { id: item.product_id },
  });
  
  if (item.qty > product.stock) {
    error.message = 'qty exceeds product\'s stock';
    throw error
  }

  await CartItem.update(
    { qty: item.qty },
    { 
      where: {
        user_id: item.user_id,
        product_id: item.product_id,
      } 
    },
  );

  return item;
});

const deleteItem = (async (item) => {
  const cartItem = await CartItem.findOne({
    where: {
      user_id: item.user_id,
      product_id: item.product_id
    },
  });
  
  if (!cartItem) {
    error.message = 'product_id not found on cart';
    throw error
  }

  await CartItem.destroy({ 
    where: {
      user_id: item.user_id,
      product_id: item.product_id,
    } 
  });
  
  return {};
});

module.exports = {
  addItemToCart,
  getCart,
  updateItem,
  deleteItem,
};
