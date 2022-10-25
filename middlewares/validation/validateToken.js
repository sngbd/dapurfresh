const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];
  if (accessToken == null) return res.notAuthorized();
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) throw err;
      req.user = user;
    });
    next();
  } catch (err) {
    return res.forbidden(err.message);
  }
}

module.exports = validateToken;