const { statusCodes, statusMessages } = require('../config');
const { ErrorHandler } = require('../errors');
const { dbService } = require('../services');

module.exports = {
    validateDataByDynamicParam: (validator, searchIn = 'body') => (req, res, next) => {
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

    getItemByDynamicParam: (itemModel, paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const item = await dbService.findItem(itemModel, { [dbFiled]: value });

            req.body.item = item;

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfItemExist: (throwErr = true) => (req, res, next) => {
        try {
            const { item } = req.body;

            if (item && throwErr) {
                return next(new ErrorHandler(statusCodes.itemAlreadyExists, statusMessages.itemAlreadyExists));
            }

            if (!item && !throwErr) {
                return next(new ErrorHandler(statusCodes.notFound, statusMessages.notFound));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
