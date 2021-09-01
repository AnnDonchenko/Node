const { passwordService } = require('../services');
const { mainVariables: { FORM_MASSAGE } } = require('../config');
const { userUtil: { userNormalizer } } = require('../utils');

module.exports = {
    renderLoginForm: (req, res, next) => {
        try {
            res.json(FORM_MASSAGE);
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const { user, password } = req.body;

            await passwordService.compare(user.password, password);

            const userForResponce = userNormalizer(user);

            res.json(userForResponce);
        } catch (e) {
            next(e);
        }
    }
};
