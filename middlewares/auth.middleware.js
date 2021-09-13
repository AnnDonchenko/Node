const {
    databaseTablesEnum,
    variables: { AUTHORIZATION, TOKEN_TYPE_REFRESH },
    statusCodes,
    statusMessages
} = require('../config');
const { TokenAuth, TokenActive } = require('../dataBase');
const { ErrorHandler } = require('../errors');
const { dbService, jwtService } = require('../services');

module.exports = {
    validateAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);
            if (!access_token) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.noToken);
            }

            await jwtService.verifyToken(access_token);

            const tokenFromDB = await dbService.findItemAndJoin(
                TokenAuth,
                { access_token },
                databaseTablesEnum.USER
            );

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
            }

            req.loginUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            if (!refresh_token) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.noToken);
            }

            await jwtService.verifyToken(refresh_token, TOKEN_TYPE_REFRESH);

            const tokenFromDB = await dbService.findItemAndJoin(
                TokenAuth,
                { refresh_token },
                databaseTablesEnum.USER
            );

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
            }

            req.loginUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateActiveToken: (token_purpose) => async (req, res, next) => {
        try {
            const active_token = req.get(AUTHORIZATION);

            if (!active_token) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.noToken);
            }

            await jwtService.verifyActiveToken(active_token, token_purpose);

            const tokenFromDB = await dbService.findItemAndJoin(
                TokenActive,
                { active_token, token_purpose },
                databaseTablesEnum.USER
            );

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
            }

            req.activeUser = tokenFromDB.user;

            await dbService.deleteItemById(TokenActive, tokenFromDB.id);

            next();
        } catch (e) {
            next(e);
        }
    }
};
