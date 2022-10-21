const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];
    if (accessToken == null) 
        return res.notAuthorized();
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.forbidden();
        req.user = user;
    });
    return next();
}

module.exports = validateToken;