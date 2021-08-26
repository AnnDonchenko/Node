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

    getAllOrByQuery: async (req, res) => {
        try {
            const { query } = req;

            const users = await User.find(query);

            res.json(users);
        } catch (e) {
            console.log(e);
        }
    },

    getOneById: async (req, res) => {
        try {
            const { user_id } = req.params;

            const user = await User.findOne({ _id: user_id });

            res.json(user);
        } catch (e) {
            console.log(e);
        }
    },

    deleteById: async (req, res) => {
        try {
            const { user_id } = req.params;

            await User.deleteOne({ _id: user_id });

            res.status(204);
        } catch (e) {
            console.log(e);
        }
    },

    updateById: async (req, res) => {
        try {
            const { user_id } = req.params;
            const newUserData = req.body;
            console.log(newUserData);

            await User.updateOne({ _id: user_id }, { name: 'max' });

            res.json('data');
        } catch (e) {
            console.log(e);
        }
    }
};
