const jwt = require('jsonwebtoken');
const util = require('util');

const {
    variables: {
        TOKEN_ACCESS_SECRET_KEY,
        TOKEN_REFRESH_SECRET_KEY,
        TOKEN_ACTIVE_SECRET_KEY,
        TOKEN_TYPE_ACCESS
    },
    statusCodes,
    statusMessages
} = require('../config');
const { ErrorHandler } = require('../errors');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, TOKEN_ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, TOKEN_REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    generateActiveToken: () => {
        const active_token = jwt.sign({}, TOKEN_ACTIVE_SECRET_KEY, { expiresIn: '5m' });

        return { active_token };
    },

    verifyActiveToken: async (token) => {
        try {
            await verifyPromise(token, TOKEN_ACTIVE_SECRET_KEY);
        } catch (e) {
            throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
        }
    },

    verifyToken: async (token, tokenType = TOKEN_TYPE_ACCESS) => {
        try {
            const secretKey = tokenType === TOKEN_TYPE_ACCESS ? TOKEN_ACCESS_SECRET_KEY : TOKEN_REFRESH_SECRET_KEY;

            await verifyPromise(token, secretKey);
        } catch (e) {
            throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
        }
    }
};
