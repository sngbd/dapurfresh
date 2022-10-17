require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { customAlphabet } = require('nanoid');

// repository
const userRepository = require('../repository/authRepository');

const postUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(req.body.password, saltRounds);

    delete req.body.password;
    req.body.password_hash = password_hash;

    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);
    req.body.ref_code = nanoid();

    const { id } = await userRepository.createUser(req.body);

    delete req.body.password_hash;
    const { ref_code, ref_code_friend, thumbnail, ...body } = req.body;
    const response = { id, ...body, ref_code, ref_code_friend, thumbnail };

    return res.respondCreated(response, 'user successfully registered');
  } catch (err) {
    return res.respond(null, err.message, err.code);
  }
};

function createAccessToken(id, username) {
  const payload = { id, username };
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN }
  );
}

function createRefreshToken(id, username) {
  const payload = { id, username };
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN }
  );
}

function accessTokenJSON(accessToken) {
  return {
    accessToken,
    token_type: "Bearer",
    expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN
  };
}

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const rows = await userRepository.find({ username });

    // User Not Found
    if (rows.length <= 0) {
      return res.notAuthorized("username and password doesn't match");
    }

    const user = rows[0];
    // const isSame = await bcrypt.compare(password, user.password_hash);
    // if (isSame === false) {
    //     return res.notAuthorized("username and password doesn't match");
    // }

    req.user = user;
  } catch (error) {
    console.log(error);
    return res.respondServerError();
  }

  return next();
}

const getTokenAfterLogin = async (req, res) => {
  const { id, username, name, phone_number, address, thumbnail } = req.user;

  try {
    const accessToken = createAccessToken(id, username);
    const refreshToken = createRefreshToken(id, username);

    res.cookie('jwt', refreshToken, {
      httpOnly: true, sameSite: 'None',
      secure: true, maxAge: 24 * 60 * 60 * 1000
    });
    return res.respondSuccess({
      user: { id, username, name, phone_number, address, thumbnail },
      accessToken: accessTokenJSON(accessToken),
      refreshToken: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN
      }
    });
  } catch (error) {
    console.log(error);
    return res.respondServerError();
  }
}

const getAccessToken = async (req, res) => {
  if (!req.cookies?.jwt) return res.notAcceptable('Unauthorized');

  const refreshToken = req.cookies.jwt;
  if (refreshToken === null) {
    return res.notAcceptable('Unauthorized');
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log(err);
      return res.forbidden();
    }

    try {
      const accessToken = createAccessToken(user.id, user.username);
      return res.respondSuccess(accessTokenJSON(accessToken));
    } catch (error) {
      console.log(error);
      return res.respondServerError();
    }
  });
}

module.exports = {
  postUser,
  login,
  getTokenAfterLogin,
  getAccessToken,
};
