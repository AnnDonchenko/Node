const { writeUserToFile, getUsersFromFile } = require('../services/user.services');

module.exports = {
    setNewUser: async (req, res) => {
        const { email, password } = req.body;
        const users = await getUsersFromFile();
        const userIndex = users.findIndex((user) => user.email === email);

        if (userIndex !== -1) {
            res.json('This email exists');
            return;
        }

        users.push({ email, password });
        await writeUserToFile(users);
        res.redirect('/auth');
    },

    getAllUsers: async (req, res) => {
        const users = await getUsersFromFile();

        res.json(users);
    },

    getSingleUser: async (req, res) => {
        const { user_id } = req.params;
        const users = await getUsersFromFile();
        const current_user = users[user_id];

        if (!current_user) {
            res.status(404).json('User not found');
            return;
        }

        res.json(current_user);
    }
};
