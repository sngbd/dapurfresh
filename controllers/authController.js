require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// validate json body
const Validator = require('fastest-validator');
const validator = new Validator();

// repository
const userRepository = require('../repository/authRepository');

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

module.exports.login = async (req, res, next) => {
    const schema = {
        username: { type: "string" },
        password: { type: "string" },
        $$strict: true
    }

    const check = validator.compile(schema);
    const checkBody = check(req.body);
    if (checkBody !== true) {
        return res.respondBadRequest("invalid body request", checkBody);
    }
    
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
        console.log(error);
        return res.respondServerError();
    }

    return next();
}

module.exports.getTokenAfterLogin = async (req, res) => {
    const { id, username, name, phone_number, address, thumbnail } = req.user;
    
    try {
        const accessToken = createAccessToken(id, username);
        const refreshToken = createRefreshToken(id, username);
        
        res.cookie('jwt', refreshToken, {
            httpOnly: true, sameSite: 'None',
            secure: true, maxAge: 24 * 60 * 60 * 1000
        });
        return res.json({
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

module.exports.getAccessToken = async (req, res) => {
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
            return res.json(accessTokenJSON(accessToken));
        } catch (error) {
            console.log(error);
            return res.respondServerError();
        }
    });
}
