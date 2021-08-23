const users = require('../db/users');

const { writeUserToFile } = require('../services/user.services');

module.exports = {
    setNewUser: (req, res) => {
        const { email, password } = req.body;
        const userIndex = users.findIndex((user) => user.email === email);

        if (userIndex !== -1) {
            res.json('This email exists');
            return;
        }

        users.push({ email, password });
        writeUserToFile(users);
        res.redirect('/auth');
    },

    getAllUsers: (req, res) => {
        res.json(users);
    },

    getSingleUser: (req, res) => {
        const { user_id } = req.params;
        const current_user = users[user_id];
        if (!current_user) {
            res.status(404).json('User not found');
        }

        res.json(current_user);
    }
};
