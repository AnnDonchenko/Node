const User = require('../dataBase/User');
const { dbService } = require('../services');
const { statusCodes, statusMessages } = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');
const { userValidator } = require('../validators');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await dbService.findItemById(User, user_id);

            if (!user) {
                throw new ErrorHandler(statusCodes.notFound, statusMessages.notFound);
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
                throw new ErrorHandler(statusCodes.itemAlreadyExists, statusMessages.emailExists);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBodyForCreate: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBodyForUpdate: (req, res, next) => {
        try {
            const { error } = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserQuery: (req, res, next) => {
        try {
            const { error } = userValidator.getUsersValidator.validate(req.query);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateIdParams: (req, res, next) => {
        try {
            const { error } = userValidator.userIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
