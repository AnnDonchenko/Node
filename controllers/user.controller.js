const User = require('../dataBase/User');

module.exports = {
    create: async (req, res) => {
        try {
            const createdUser = await User.create(req.body);

            res.json(createdUser);
        } catch (e) {
            console.log(e);
        }
    },

    getAll: async (req, res) => {
        try {
            const { query } = req;
            const users = await User.find(query);

            res.json(users);
        } catch (e) {
            console.log(e);
        }
    },

    deleteCurrent: async (req, res) => {
        try {
            const { user_id } = req.params;

            await User.deleteOne({ id: user_id });

            res.status(204).json(`User with id ${user_id} is deleted`);
        } catch (e) {
            console.log(e);
        }
    }
};
