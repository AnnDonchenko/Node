const Car = require('../dataBase/Car');
const { dbService } = require('../services');
const { statusCodes, statusMessages } = require('../config');

module.exports = {
    create: async (req, res, next) => {
        try {
            const createdCar = await dbService.createItem(Car, req.body);

            res.status(statusCodes.created).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    getAllOrByQuery: async (req, res, next) => {
        try {
            const { query } = req;

            const cars = await dbService.findItemsByQuery(Car, query);

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
    },

    deleteById: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await dbService.deleteItemById(Car, car_id);

            res.status(statusCodes.deleted).json(statusMessages.deleted);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const newCarData = req.body;

            await dbService.updateItemById(Car, car_id, newCarData);

            res.status(statusCodes.updated).json(statusMessages.updated);
        } catch (e) {
            next(e);
        }
    }
};
