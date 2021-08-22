const users = require('../db/users');

module.exports = {
    loginUser: (req, res) => {
        try {
            const { email, password } = req.body;

            users.forEach((value, index) => {
                if (value.email === email && value.password === password) {
                    return res.redirect(`/users/${index}`);
                }
            });

            return res.redirect('/registration');
        } catch (e) {
            console.log(e);
        }
    },
    getLoginForm: (req, res) => {
        res.json('get. login form');
    }
};
