const supertest = require('supertest');
const helper = require('./auth_test_helper');
const app = require('../app');
const { User } = require('../models');

const api = supertest(app);

beforeEach(async () => {
  await User.destroy({
    where: {}
  });

  User.create(helper.initialUser)
});

describe('valid users are created', () => {
  test('valid friend\'s refferal code', async () => {
    const resFriend = await api
      .post('/api/v1/auth/register')
      .send(helper.friend)
      .expect(201);

    const ref_code = resFriend.body.data.ref_code;
    expect(ref_code).toBeDefined();
 
    helper.validUser.ref_code_friend = ref_code;

    await api
      .post('/api/v1/auth/register')
      .send(helper.validUser)
      .expect(201);
  });
});

describe('invalid users are not created', () => {
  test('username is not unique', async () => {
    const res = await api
      .post('/api/v1/auth/register')
      .send(helper.notUnique)
      .expect(400)

    expect(res.body.message).toBe('username already exists')
  });

  test('invalid friend\'s referral code', async () => {
    const res = await api
      .post('/api/v1/auth/register')
      .send(helper.invalidFriendRefCode)
      .expect(400)

    expect(res.body.message).toBe('friend\'s referral code is invalid');
  });

  test('username and password are missing', async () => {
    await api
      .post('/api/v1/auth/register')
      .send(helper.missingFields)
      .expect(400)
  });

  test('password is less than 6 characters long', async () => {
    await api
      .post('/api/v1/auth/register')
      .send(helper.invalidLength)
      .expect(400)
  });

  test('password without special character', async () => {
    await api
      .post('/api/v1/auth/register')
      .send(helper.noSpecialChar)
      .expect(400)
  });

  test('password without uppercase character', async () => {
    await api
      .post('/api/v1/auth/register')
      .send(helper.noUppercase)
      .expect(400)
  });

  test('password without lowercase character', async () => {
    await api
      .post('/api/v1/auth/register')
      .send(helper.noLowercase)
      .expect(400)
  });

  test('invalid phone number', async () => {
    await api
      .post('/api/v1/auth/register')
      .send(helper.invalidPhoneNumber)
      .expect(400)
  });
});
