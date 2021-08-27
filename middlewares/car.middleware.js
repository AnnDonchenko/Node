const Car = require('../dataBase/Car');
const { dbService } = require('../services/index');
const { requestVariables: { notFound, modelExists } } = require('../config/index');
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

    checkUniqueModel: async (req, res, next) => {
        try {
            const { model } = req.body;
            const carByModel = await dbService.findItem(Car, { model });

            if (carByModel) {
                throw new ErrorHandler(modelExists.statusCode, modelExists.massage);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
