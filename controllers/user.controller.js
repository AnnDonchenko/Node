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
            const users = await User.find();

            res.json(users);
        } catch (e) {
            console.log(e);
        }
    },

    getByEmailOrName: async (req, res) => {
        try {
            const { email: queryEmail, name: queryName } = req.query;

            if (queryEmail) {
                const user = await User.findOne({ email: queryEmail });
                res.json(user);
                return;
            }

            if (queryName) {
                const user = await User.findOne({ name: queryName });
                res.json(user);
                return;
            }

            res.json('set some query params');
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
