const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);
const ref_code = nanoid();

const username = "test";

module.exports = {
  friend: {
    username: "kelompok1",
    password: "Kelompok1#",
  },
  validUser: {
    username: "test",
    password: "Test1#",
  },
  initialUser: {
    username: "kel1be",
    password_hash: "password_hash",
    ref_code,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  notUnique: {
    username: "kel1be",
    password: "Kelompok1@",
  },
  invalidFriendRefCode: {
    username,
    password: "Kelompok1@",
    ref_code_friend: "ABCDEF",
  },
  missingFields: {
    name: 'Kelompok 1 BE',
  },
  invalidLength: {
    username,
    password: 'Abc1#'
  },
  noSpecialChar: {
    username,
    password: 'Abc123'
  },
  noUppercase: {
    username,
    password: 'abc123'
  },
  noLowercase: {
    username,
    password: 'ABC123'
  },
  invalidPhoneNumber: {
    username,
    password: "Kelompok1@",
    phone_number: '08123123123a'
  },
}