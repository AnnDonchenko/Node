const User = require('../dataBase/User');
const { dbService } = require('../services');
const { statusCodes, statusMessages } = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');
const { authValidator } = require('../validators');

module.exports = {
    isUserEmailPresent: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await dbService.findItem(User, { email });

            if (!userByEmail) {
                throw new ErrorHandler(statusCodes.notValidData, statusMessages.notLogined);
            }

            req.body.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateLoginationData: (req, res, next) => {
        try {
            const { error } = authValidator.authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, statusMessages.notLogined);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
