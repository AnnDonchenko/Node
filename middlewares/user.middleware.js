const { User } = require('../dataBase');
const { dbService } = require('../services');
const { statusCodes, statusMessages } = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
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

    validateUserDataByDynamicParam: (validator, searchIn = 'body') => (req, res, next) => {
        try {
            const { error } = validator.validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await dbService.findItem(User, { [dbFiled]: value });

            if (!user) {
                throw new ErrorHandler(statusCodes.notFound, statusMessages.notFound);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
