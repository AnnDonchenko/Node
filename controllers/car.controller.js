const Car = require('../dataBase/RetroCar');
const dbService = require('../services/db.service');
const { requestVariables: { created } } = require('../config');

module.exports = {
    create: async (req, res, next) => {
        try {
            const createdCar = await dbService.createItem(Car, req.body);

            res.status(created.statusCode).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const cars = await dbService.findItemsByQuery(Car);

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getOneById: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    }
};
