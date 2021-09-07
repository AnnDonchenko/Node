const { variables: { FORM_MASSAGE, AUTHORIZATION }, statusCodes } = require('../config');
const { TokenAuth } = require('../dataBase');
const { passwordService, dbService, jwtService } = require('../services');
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
            const { item: user, password } = req.body;

            await passwordService.compare(user.password, password);

            const tokenPair = jwtService.generateTokenPair();

            await dbService.createItem(TokenAuth, { ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizer(user)
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);
            await dbService.deleteItem(TokenAuth, { access_token });

            res.status(statusCodes.deleted);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const user = req.loginUser;

            await dbService.deleteItem(TokenAuth, { refresh_token });

            const tokenPair = jwtService.generateTokenPair();

            await dbService.createItem(TokenAuth, { ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizer(user)
            });
        } catch (e) {
            next(e);
        }
    }
};
