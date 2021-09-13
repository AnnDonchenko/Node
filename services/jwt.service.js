const jwt = require('jsonwebtoken');
const util = require('util');

const {
    variables: {
        TOKEN_ACCESS_SECRET_KEY,
        TOKEN_REFRESH_SECRET_KEY,
        TOKEN_ACTIVE_SECRET_KEY,
        TOKEN_ACTIVATE_ACCOUNT_SECRET_KEY,
        TOKEN_FORGOT_PASSWORD_SECRET_KEY,
        TOKEN_PASSWORD_CHANGE_ADMIN_SECRET_KEY,
        TOKEN_TYPE_ACCESS
    },
    tokenPurposeEnum,
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

    generateActiveToken: (tokenPurpose) => {
        let key = '';

        switch (tokenPurpose) {
            case tokenPurposeEnum.activateAccount:
                key = TOKEN_ACTIVATE_ACCOUNT_SECRET_KEY;
                break;
            case tokenPurposeEnum.passwordChangeAdmin:
                key = TOKEN_PASSWORD_CHANGE_ADMIN_SECRET_KEY;
                break;
            case tokenPurposeEnum.forgotPass:
                key = TOKEN_FORGOT_PASSWORD_SECRET_KEY;
                break;
            default:
                key = TOKEN_ACTIVE_SECRET_KEY;
        }

        const active_token = jwt.sign({}, key, { expiresIn: '1d' });

        return { active_token };
    },

    verifyActiveToken: async (token, tokenPurpose) => {
        try {
            let key = '';

            switch (tokenPurpose) {
                case tokenPurposeEnum.activateAccount:
                    key = TOKEN_ACTIVATE_ACCOUNT_SECRET_KEY;
                    break;
                case tokenPurposeEnum.passwordChangeAdmin:
                    key = TOKEN_PASSWORD_CHANGE_ADMIN_SECRET_KEY;
                    break;
                case tokenPurposeEnum.forgotPass:
                    key = TOKEN_FORGOT_PASSWORD_SECRET_KEY;
                    break;
                default:
                    key = TOKEN_ACTIVE_SECRET_KEY;
            }
            await verifyPromise(token, key);
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
