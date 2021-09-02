const jwt = require('jsonwebtoken');
const util = require('util');

const {
    mainVariables: { TOKEN_ACCESS_SECRET_KEY, TOKEN_REFRESH_SECRET_KEY, TOKEN_TYPE_ACCESS },
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

    verifyToken: async (token, tokenType = TOKEN_TYPE_ACCESS) => {
        try {
            const secretKey = tokenType === TOKEN_TYPE_ACCESS ? TOKEN_ACCESS_SECRET_KEY : TOKEN_REFRESH_SECRET_KEY;

            await verifyPromise(token, secretKey);
        } catch (e) {
            throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
        }
    }
};
