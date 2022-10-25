const supertest = require('supertest');
const helper = require('./auth_test_helper');
const app = require('../app');
const { User } = require('../models');

const bcrypt = require('bcrypt');
const api = supertest(app);

beforeEach(async () => {
  await User.destroy({
    where: {}
  });

  const password = "Test123#";
  const password_hash = await bcrypt.hash(password, 10);

  helper.initialUser.password_hash = password_hash;
  User.create(helper.initialUser);
  helper.initialUser.password = password;
  delete helper.initialUser.password_hash;
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

describe('login valid', () => {
  test('success', async () => {
    await api
      .post('/api/v1/auth/login')
      .send({
        username: helper.initialUser.username,
        password: helper.initialUser.password
      })
      .expect(200)
  });
});

// describe('login not valid', () => {
//   test('username and password doesn\'t match 1', async () => {
//     await api
//       .post('/api/v1/auth/login')
//       .send(helper.usernameAndPassDoesntMatch1)
//       .expect(401)
//   });

//   test('username and password doesn\'t match 2', async () => {
//     await api
//       .post('/api/v1/auth/login')
//       .send(helper.usernameAndPassDoesntMatch2UsernameCorrect)
//       .expect(401)
//   });

//   test('username is missing', async () => {
//     await api
//       .post('/api/v1/auth/login')
//       .send(helper.missingUsernameLogin)
//       .expect(400)
//   });

//   test('password is missing', async () => {
//     await api
//       .post('/api/v1/auth/login')
//       .send(helper.missingPasswordLogin)
//       .expect(400)
//   });

//   test('username is not a string', async () => {
//     await api
//       .post('/api/v1/auth/login')
//       .send(helper.usernameIsNotAString)
//       .expect(400)
//   });

//   test('password is not a string', async () => {
//     await api
//       .post('/api/v1/auth/login')
//       .send(helper.passwordIsNotAString)
//       .expect(400)
//   });
// });