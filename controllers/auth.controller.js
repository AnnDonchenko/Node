const users = require('../db/users');

module.exports = {
    loginUser: (req, res) => {
        const { email, password } = req.body;

        users.forEach((value, index) => {
            if (value.email === email && value.password === password) {
                res.redirect(`/users/${index}`);
            }
        });

        res.redirect('/registration');
    },
    getLoginForm: (req, res) => {
        res.render('login');
    }
};
