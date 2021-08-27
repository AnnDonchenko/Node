const Car = require('../dataBase/Car');
const { dbService } = require('../services/index');

module.exports = {
    create: async (req, res, next) => {
        try {
            const createdCar = await dbService.createItem(Car, req.body);

            res.json(createdCar);
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

            res.json(`car with id ${car_id} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const newCarData = req.body;

            await dbService.updateItemById(Car, car_id, newCarData);

            res.json(`car with id ${car_id} is updated`);
        } catch (e) {
            next(e);
        }
    }
};
