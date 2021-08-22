const path = require('path');
const fs = require('fs');

const users = require('../db/users');

module.exports = {
    setNewUser: (req, res) => {
        try {
            const { email, password } = req.body;

            const fileDbPath = path.join(process.cwd(), 'db', 'users.js');
            const textForWrite = `module.exports = \n${JSON.stringify(users)}`;

            for (const user of users) {
                if (user.email === email) {
                    res.json('This email exists');
                    return;
                }
            }

            users.push({ email, password });

            fs.writeFile(fileDbPath, textForWrite, (err) => res.status(500).json(err));

            return res.redirect('/auth');
        } catch (e) {
            console.log(e);
        }
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
