const Car = require('../dataBase/RetroCar');
const dbService = require('../services/db.service');
const {
    requestVariables: {
        notFound, brandExists, priceNotValid, yearNotValid
    }
} = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            const car = await dbService.findItemById(Car, car_id);

            if (!car) {
                throw new ErrorHandler(notFound.statusCode, notFound.massage);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueBrand: async (req, res, next) => {
        try {
            const { brand } = req.body;
            const carByBrand = await dbService.findItem(Car, { brand });

            if (carByBrand) {
                throw new ErrorHandler(brandExists.statusCode, brandExists.massage);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPriceBiggerThenZero: (req, res, next) => {
        try {
            const { price } = req.body;

            if (price < 0) {
                throw new ErrorHandler(priceNotValid.statusCode, priceNotValid.massage);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkYearInRange: (req, res, next) => {
        try {
            const { year } = req.body;

            if (year < 1885 || year > 1980) {
                throw new ErrorHandler(yearNotValid.statusCode, yearNotValid.massage);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
