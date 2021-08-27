const User = require('../dataBase/User');
const { dbService } = require('../services');
const { requestVariables: { created, updated, deleted } } = require('../config');

module.exports = {
    create: async (req, res, next) => {
        try {
            const createdUser = await dbService.createItem(User, req.body);

            res.status(created.statusCode).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    getAllOrByQuery: async (req, res, next) => {
        try {
            const { query } = req;

            const users = await dbService.findItemsByQuery(User, query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getOneById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    deleteById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await dbService.deleteItemById(User, user_id);

            res.status(deleted.statusCode).json(deleted.massage);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const newUserData = req.body;

            await dbService.updateItemById(User, user_id, newUserData);

            res.status(updated.statusCode).json(updated.massage);
        } catch (e) {
            next(e);
        }
    }
};
