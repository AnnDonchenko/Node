const Car = require('../dataBase/Car');
const { dbService } = require('../services');
const { statusCodes, statusMessages } = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');
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
    }
};
