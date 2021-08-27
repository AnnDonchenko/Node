const User = require('../dataBase/User');
const { dbService } = require('../services');
const { requestVariables: { notFound, emailExists } } = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await dbService.findItemById(User, user_id);

            if (!user) {
                throw new ErrorHandler(notFound.statusCode, notFound.massage);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await dbService.findItem(User, { email });

            if (userByEmail) {
                throw new ErrorHandler(emailExists.statusCode, emailExists.massage);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
