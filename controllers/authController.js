const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// repository
const userRepository = require('../repository/authRepository');

const registerUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(req.body.password, saltRounds);

    delete req.body.password;
    req.body.password_hash = password_hash;

    const { id, ref_code } = await userRepository.createUser(req.body);

    delete req.body.password_hash;
    const { ref_code_friend, thumbnail, ...body } = req.body;
    const response = {
      id,
      ...body,
      ref_code,
      ref_code_friend,
      thumbnail,
    };

    return res.respondCreated(response, 'user successfully registered');
  } catch (err) {
    return res.respond(null, err.message, err.code);
  }
};

function createAccessToken(id, username) {
  const payload = { id, username };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN });
}
function createAccessTokenLogout(id, username) {
  const payload = { id, username };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1s' });
}

function createRefreshToken(id, username) {
  const payload = { id, username };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN });
}
function createRefreshTokenLogout(id, username) {
  const payload = { id, username };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1s' });
}

function accessTokenJSON(accessToken) {
  return {
    accessToken,
    token_type: 'Bearer',
    expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
  };
}
function accessTokenLogout(accessToken) {
  return {
    accessToken,
    token_type: 'Bearer',
    expiresIn: '1s',
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
    const isSame = await bcrypt.compare(password, user.password_hash);
    if (isSame === false) {
      return res.notAuthorized("username and password doesn't match");
    }

    req.user = user;
  } catch (error) {
    return res.respondServerError();
  }

  return next();
};

const getTokenAfterLogin = async (req, res) => {
  const { id, username, name, phone_number, address, thumbnail } = req.user;

  try {
    const accessToken = createAccessToken(id, username);
    const refreshToken = createRefreshToken(id, username);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.respondSuccess({
      user: {
        id,
        username,
        name,
        phone_number,
        address,
        thumbnail,
      },
      accessToken: accessTokenJSON(accessToken),
      refreshToken: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
      },
    });
  } catch (error) {
    console.log(error);
    return res.respondServerError();
  }
};

const getAccessToken = async (req, res) => {
  if (!req.cookies?.jwt) return res.notAcceptable('Unauthorized');

  const refreshToken = req.cookies.jwt;
  if (refreshToken === null) {
    return res.notAcceptable('Unauthorized');
  }

  const accessToken = async (err, user) => {
    if (err) return res.forbidden(err.message);
    return createAccessToken(user.id, user.username);
  };

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, accessToken);

  return res.respondSuccess(accessTokenJSON(accessToken));
};

// const logout1 = async (req, res) => {
//   // if (req.cookies?.jwt) {
//   //   req.session = null;
//   //   req.logout();
//   //   return res.respondSuccess(null, 'success');
//   // }
//   // req.session = null;
//   // req.logout;
//   // return res.respondFail();
//   // const { id, username } = req.user;
//   // const authorizationHeader = req.headers.authorization;
//   // const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];
//   // if (accessToken != accessToken) return res.notAuthorized();
//   // req.session = null;
//   // req.logout;
//   // const date = new Date();
//   // const refreshToken = createRefreshToken(id, username);

//   // return res.respondSuccess({
//   //   user: {
//   //     id,
//   //   },
//   //   accessToken: accessTokenJSON(accessToken),
//   //   refreshToken: {
//   //     expiresIn: date,
//   //   },
//   // });

//   const newToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: date });
//   return res.respondFail();
//   var authHeader = req.headers.authorization;
//   var authHeader = (accessToken = authorizationHeader && authorizationHeader.split(' ')[1]);
//   authHeader = '';
//   jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
//     if (logout) {
//       res.send({ msg: 'You have been Logged Out' });
//     } else {
//       res.send({ msg: 'Error' });
//     }
//   });

//   // return res.respondFail(authHeader);
//   // try{
//   //   const {refreshToken} = req.body
//   //   if (!refreshToken) return res.respondBadRequest();
//   //   const {userId} = await verifyRefreshToken(refreshToken)
//   //   client.del()
//   // } catch (error) {
//   //   console.log(error);
//   //   return res.respondServerError();
//   // }
// };

// const logout = async (req, res) => {
//   try {
//     const authorizationHeader = req.headers.authorization;
//     var authHeader = req.headers.authorization;
//     const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];
//     // const token = req.user.tokens;
//     jwt.sign(authHeader, accessToken, { expiresIn: process.env.ACCESS_TOKEN_LOGOUT }, (logout, err) => {
//       if (logout) {
//         return res.respondSuccess(accessToken, 'Success logout');
//       } else {
//         res.send({ msg: 'Error' });
//       }
//     });
//     // authorizationHeader = authorizationHeader.filter((token) => {
//     //   return token.token !== authorizationHeader;
//     // });
//     // await req.user.save();
//     // res.send();
//     // return res.respondSuccess('success', token);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const logout = async (req, res) => {
//   const { id, username } = req.user;

//   try {
//     const accessToken = createAccessTokenLogout(id, username);
//     const refreshToken = createRefreshTokenLogout(id, username);

//     res.cookie('jwt', refreshToken, {
//       httpOnly: true,
//       sameSite: 'None',
//       secure: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     return res.respondSuccess({
//       accessToken: accessTokenLogout(accessToken),
//       refreshToken: {
//         expiresIn: '1s',
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     return res.respondServerError();
//   }
// };

module.exports = {
  registerUser,
  login,
  getTokenAfterLogin,
  getAccessToken,
  // logout,
};
