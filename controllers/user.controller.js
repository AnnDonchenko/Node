const {
    emailActionsEnum: {
        ACCOUNT_CREATE,
        ACCOUNT_DELETE_ADMIN,
        ACCOUNT_DELETE_USER,
        ACCOUNT_UPDATE
    },
    statusCodes,
    statusMessages,
    variables,
    userRolesEnum
} = require('../config');
const { User } = require('../dataBase');
const { dbService, emailService, passwordService } = require('../services');
const { userUtil: { userNormalizer } } = require('../utils');

module.exports = {
    create: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            const hashedPassword = await passwordService.hash(password);
            const createdUser = await dbService.createItem(User, { ...req.body, password: hashedPassword });

            const userToReturn = userNormalizer(createdUser);

            await emailService.sendMail(
                variables.EMAIL_FOR_TEST_LETTERS || email,
                ACCOUNT_CREATE,
                { userName: name }
            );

            res.status(statusCodes.created).json(userToReturn);
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
