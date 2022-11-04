const supertest = require('supertest');
const helper = require('./cart_test_helper');
const app = require('../app');
const api = supertest(app);
const { User, CartItem } = require('../models');
const { not } = require('joi');
const { initialCarts } = require('./cart_test_helper');

let authorization;
let userId;

beforeEach(async () => {
  await User.destroy({ where: {} });

  await api
    .post('/api/v1/auth/register')
    .send(helper.user);

  const res = await api
    .post('/api/v1/auth/login')
    .send(helper.user);
  
  const { accessToken } = res.body.data.accessToken;
  authorization = { Authorization: `bearer ${accessToken}`};
  userId = res.body.data.user.id;
  
  await CartItem.destroy({ where: { user_id: userId} });

  for (const cart of helper.initialCarts) {
    await api
      .post('/api/v1/cart')
      .send(cart)
      .set(authorization);
  }
});

describe('get list of cart', () => {
  test('initial carts were added', async () => {
    const res = await api
      .get('/api/v1/cart')
      .set(authorization)
      .expect(200)
    
    const { data } = res.body;

    for (i in helper.initialCarts) {
      expect(data[i].user_id).toEqual(userId)
      expect(data[i].product_id).toEqual(helper.initialCarts[i].product_id)
      expect(data[i].qty).toEqual(helper.initialCarts[i].qty)
    }
  })

  test('when there is no cart', async () => {
    await CartItem.destroy({ where: { user_id: userId} });

    const res = await api
      .get('/api/v1/cart')
      .set(authorization)
      .expect(404);

    expect(res.body.message).toBe('cart not found');
  })
})

describe('add a new cart', () => {
  test('a valid cart can be added', async () => {
    const res = await api
      .post('/api/v1/cart')
      .send(helper.validCart)
      .set(authorization)
      .expect(201);

    const newCarts = await api
      .get('/api/v1/cart')
      .set(authorization)
      .expect(200)
      
    expect(newCarts.body.data).toHaveLength(helper.initialCarts.length + 1);
    expect(res.body.message).toBe('item added to the cart successfully');
  })

  test('a cart with invalid product_id cannot be added', async () => {
    const res = await api
      .post('/api/v1/cart')
      .send(helper.invalidProductId)
      .set(authorization)
      .expect(404);
    
    expect(res.body.message).toBe('invalid product_id');
  })

  test('a cart with qty that exceeds product\'s stock cannot be added', async () => {
    const res = await api
      .post('/api/v1/cart')
      .send(helper.notEnoughStock)
      .set(authorization)
      .expect(400);
    
    expect(res.body.message).toBe('qty exceeds product\'s stock');
  })

  test('an existing cart item cannot be added', async () => {
    const res = await api
      .post('/api/v1/cart')
      .send(helper.alreadyAdded)
      .set(authorization)
      .expect(400);
    
    expect(res.body.message).toBe('item already added');
  })

  test('qty is not a positive number', async () => {
    const res = await api
      .post('/api/v1/cart')
      .send(helper.invalidQty)
      .set(authorization)
      .expect(400);
    
    expect(res.body.message).toBe('"qty" must be a positive number');
  })
})

describe('update a cart', () => {
  test('a valid cart can be updated', async () => {
    const toBeUpdated = helper.initialCarts[1];
    toBeUpdated.qty = 2;

    await api
      .put('/api/v1/cart')
      .send(toBeUpdated)
      .set(authorization)
      .expect(201);
    
    const updated = await api
      .get('/api/v1/cart')
      .set(authorization)
      
    const updatedData = updated.body.data.map(c => {
      const cart = {
        product_id: c.product_id,
        qty: c.qty
      }
      return cart;
    })

    expect(updatedData).toContainEqual(toBeUpdated);
  })

  test('invalid cart cannot be updated', async () => {
    const res = await api
      .put('/api/v1/cart')
      .send(helper.invalidProductId)
      .set(authorization)
      .expect(404);
    
    expect(res.body.message).toBe('product_id not found on cart');
  })

  test('a cart with qty that exceeds product\'s stock cannot be updated', async () => {
    const { notEnoughStock } = helper;
    notEnoughStock.product_id = 1;

    const res = await api
      .put('/api/v1/cart')
      .send(notEnoughStock)
      .set(authorization)
      .expect(400);
    
    expect(res.body.message).toBe('qty exceeds product\'s stock');
  })
})

describe('delete a cart', () => {
  test('a valid cart can be deleted', async () => {
    const toBeDeleted = {
      product_id: 2,
    };

    const res = await api
      .delete('/api/v1/cart')
      .send(toBeDeleted)
      .set(authorization)
      .expect(200);

    const newCarts = await api
      .get('/api/v1/cart')
      .set(authorization)
      .expect(200)

    const withoutDeletedCart = newCarts.body.data.map(c => {
      const cart = {
        product_id: c.product_id,
        qty: c.qty
      }
      return cart;
    })

    expect(withoutDeletedCart).not.toContainEqual(helper.initialCarts[0]);
    expect(res.body.message).toBe('item deleted successfully');
  })

  test('invalid cart cannot be deleted', async () => {
    const toBeDeleted = {
      product_id: 100,
    };

    const res = await api
      .delete('/api/v1/cart')
      .send(toBeDeleted)
      .set(authorization)
      .expect(404);
    
    expect(res.body.message).toBe('product_id not found on cart');
  })
})