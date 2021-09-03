const {
    databaseTablesEnum,
    mainVariables: { AUTHORIZATION, TOKEN_TYPE_REFRESH },
    statusCodes,
    statusMessages
} = require('../config');
const { TokenAuth } = require('../dataBase');
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
    }
};
