const { Car } = require('../dataBase');
const { dbService } = require('../services');
const { statusCodes, statusMessages } = require('../config');
const { ErrorHandler } = require('../errors');
const { carValidator } = require('../validators');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            const car = await dbService.findItemById(Car, car_id);

            if (!car) {
                throw new ErrorHandler(statusCodes.notFound, statusMessages.notFound);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueModel: async (req, res, next) => {
        try {
            const { model } = req.body;
            const carByModel = await dbService.findItem(Car, { model });

            if (carByModel) {
                throw new ErrorHandler(statusCodes.itemAlreadyExists, statusMessages.modelExists);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarBodyForCreate: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarBodyForUpdate: (req, res, next) => {
        try {
            const { error } = carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarQuery: (req, res, next) => {
        try {
            const { error } = carValidator.getCarsValidator.validate(req.query);

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
            const { error } = carValidator.carIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarDataByDynamicParam: (validator, searchIn = 'body') => (req, res, next) => {
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

    getCarByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await dbService.findItem(Car, { [dbFiled]: value });

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
