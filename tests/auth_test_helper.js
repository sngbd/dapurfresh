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
  // login
  validUserLogin: {
    username: "kel1be",
    password: "Test1#"
  },
  missingUsernameLogin: {
    password: "anyPassword",
  },
  missingPasswordLogin: {
    username: "anyUser"
  },
  usernameIsNotAString: {
    username: 4234,
    password: "12435678"
  },
  passwordIsNotAString: {
    username: "anyUser",
    password: 14355556
  },
  usernameAndPassDoesntMatch1: {
    username: 'anyUsername',
    password: "12345678",
  },
  usernameAndPassDoesntMatch2UsernameCorrect: {
    username: 'kel1be',
    password: "12345678",
  },
}