const {
    emailActionsEnum: {
        ACCOUNT_CREATE,
        ACCOUNT_ADMIN_CREATE,
        ACCOUNT_DELETE_ADMIN,
        ACCOUNT_DELETE_USER,
        ACCOUNT_UPDATE,
        PASSWORD_CHANGE
    },
    statusCodes,
    statusMessages,
    tokenPurposeEnum,
    variables,
    userRolesEnum
} = require('../config');
const { User, TokenActive } = require('../dataBase');
const {
    dbService,
    emailService,
    passwordService,
    jwtService
} = require('../services');
const { userUtil: { userNormalizer } } = require('../utils');

module.exports = {
    create: async (req, res, next) => {
        try {
            const user = req.body;

            const hashedPassword = await passwordService.hash(user.password);
            const createdUser = await dbService.createItem(
                User,
                { ...user, password: hashedPassword }
            );

            const userToReturn = userNormalizer(createdUser);

            const token = jwtService.generateActiveToken();

            await dbService.createItem(
                TokenActive,
                { ...token, token_purpose: tokenPurposeEnum.activateAccount, user: createdUser.id }
            );

            await emailService.sendMail(
                variables.EMAIL_FOR_TEST_LETTERS || createdUser.email,
                ACCOUNT_CREATE,
                {
                    userName: createdUser.name,
                    activeTokenLink: `${variables.FRONTEND_SITE}?${variables.AUTHORIZATION}=${token.active_token}`
                }
            );

            res.status(statusCodes.created).json({
                ...token,
                user: userToReturn
            });
        } catch (e) {
            next(e);
        }
    },

    createAdmin: async (req, res, next) => {
        try {
            const user = req.body;
            const { loginUser } = req;

            const hashedPassword = await passwordService.hash(user.password);
            const createdUser = await dbService.createItem(User, {
                ...user,
                password: hashedPassword
            });

            const userToReturn = userNormalizer(createdUser);

            const token = jwtService.generateActiveToken();

            await dbService.createItem(
                TokenActive,
                { ...token, token_purpose: tokenPurposeEnum.passwordChangeAdmin, user: createdUser.id }
            );

            await emailService.sendMail(
                variables.EMAIL_FOR_TEST_LETTERS || createdUser.email,
                ACCOUNT_ADMIN_CREATE,
                {
                    userName: createdUser.name,
                    adminName: loginUser.name,
                    activeTokenLink: `${variables.FRONTEND_SITE}?${variables.AUTHORIZATION}=${token.active_token}`
                }
            );

            res.status(statusCodes.created).json({
                ...token,
                user: userToReturn
            });
        } catch (e) {
            next(e);
        }
    },

    activateAccount: async (req, res, next) => {
        try {
            const user = req.activeUser;

            await dbService.updateItemById(User, user.id, { activatedByEmail: true });

            res.json(statusMessages.activatedAccount);
        } catch (e) {
            next(e);
        }
    },

    changePassAdmin: async (req, res, next) => {
        try {
            const { activeUser, body: { password } } = req;

            const hashedPassword = await passwordService.hash(password);

            await dbService.updateItemById(User, activeUser.id, {
                activatedByEmail: true,
                password: hashedPassword
            });

            await emailService.sendMail(
                variables.EMAIL_FOR_TEST_LETTERS || activeUser.email,
                PASSWORD_CHANGE,
                { userName: activeUser.name }
            );

            res.status(statusCodes.updated).json(statusMessages.paswordUpdated);
        } catch (e) {
            next(e);
        }
    },

    getAllOrByQuery: async (req, res, next) => {
        try {
            const { query } = req;

            const users = await dbService.findItemsByQuery(User, query);

            const usersToReturn = users.map((item) => userNormalizer(item));

            res.json(usersToReturn);
        } catch (e) {
            next(e);
        }
    },

    getOneById: (req, res, next) => {
        try {
            const { item: user } = req.body;

            const userToReturn = userNormalizer(user);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const userData = req.body;

            await dbService.deleteItemById(User, user_id);

            await emailService.sendMail(
                variables.EMAIL_FOR_TEST_LETTERS || userData.item.email,
                req.userPermission === userRolesEnum.ADMIN ? ACCOUNT_DELETE_ADMIN : ACCOUNT_DELETE_USER,
                {
                    userName: userData.name || userData.item.name,
                }
            );

            res.status(statusCodes.deleted).json(statusMessages.deleted);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const userData = req.body;

            await dbService.updateItemById(User, user_id, userData);

            await emailService.sendMail(
                variables.EMAIL_FOR_TEST_LETTERS || userData.item.email,
                ACCOUNT_UPDATE,
                { userName: userData.name || userData.item.name }
            );

            res.status(statusCodes.updated).json(statusMessages.updated);
        } catch (e) {
            next(e);
        }
    }
};
