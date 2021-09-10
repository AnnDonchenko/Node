const {
    emailActionsEnum,
    variables: {
        AUTHORIZATION,
        EMAIL_FOR_TEST_LETTERS,
        FORM_MASSAGE,
        FRONTEND_SITE
    },
    tokenPurposeEnum,
    statusCodes,
    statusMessages
} = require('../config');
const { TokenAuth, TokenActive, User } = require('../dataBase');
const {
    dbService,
    emailService,
    passwordService,
    jwtService
} = require('../services');
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

            await emailService.sendMail(
                EMAIL_FOR_TEST_LETTERS || user.email,
                emailActionsEnum.ACCOUNT_AUTH,
                { userName: user.name }
            );

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
    },

    passwordForgotSendEmail: async (req, res, next) => {
        try {
            const { item: user, email } = req.body;

            const token = jwtService.generateActiveToken(tokenPurposeEnum.forgotPass);

            await dbService.createItem(
                TokenActive,
                { ...token, token_purpose: tokenPurposeEnum.forgotPass, user: user._id }
            );

            await emailService.sendMail(
                EMAIL_FOR_TEST_LETTERS || email,
                emailActionsEnum.PASSWORD_FORGOT,
                {
                    userName: user.name,
                    activeTokenLink: `${FRONTEND_SITE}?${AUTHORIZATION}=${token.active_token}`
                }
            );

            res.json({
                ...token,
                token_purpose: tokenPurposeEnum.forgotPass,
                user: user._id
            });
        } catch (e) {
            next(e);
        }
    },

    passwordForgotChange: async (req, res, next) => {
        try {
            const { item: user, email, password } = req.body;

            const hashedPassword = await passwordService.hash(password);
            await dbService.updateItemById(User, user.id, { password: hashedPassword });

            await emailService.sendMail(
                EMAIL_FOR_TEST_LETTERS || email,
                emailActionsEnum.PASSWORD_CHANGE,
                { userName: user.name }
            );

            res.status(statusCodes.updated).json(statusMessages.paswordUpdated);
        } catch (e) {
            next(e);
        }
    },

    passwordChange: async (req, res, next) => {
        try {
            const { loginUser, body: { old_password, password } } = req;

            await passwordService.compare(loginUser.password, old_password);

            const hashedPassword = await passwordService.hash(password);
            await dbService.updateItemById(User, loginUser.id, { password: hashedPassword });

            await dbService.deleteItems(TokenAuth, { user: loginUser.id });

            await emailService.sendMail(
                EMAIL_FOR_TEST_LETTERS || loginUser.email,
                emailActionsEnum.PASSWORD_CHANGE,
                { userName: loginUser.name }
            );

            res.status(statusCodes.updated).json(statusMessages.paswordUpdated);
        } catch (e) {
            next(e);
        }
    }
};
