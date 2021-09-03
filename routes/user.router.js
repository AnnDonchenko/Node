const router = require('express').Router();

const { middlewareVars } = require('../config');
const { userController } = require('../controllers');
const { User } = require('../dataBase');
const {
    authMiddleware,
    generalMiddleware: {
        validateDataByDynamicParam,
        getItemByDynamicParam,
        throwIfItemExist
    },
    userMiddleware
} = require('../middlewares');
const { userValidator } = require('../validators');

router.post(
    '/',
    validateDataByDynamicParam(userValidator.createUserValidator),
    getItemByDynamicParam(User, middlewareVars.email),
    throwIfItemExist(),
    userController.create
);
router.get(
    '/',
    validateDataByDynamicParam(userValidator.getUsersValidator, middlewareVars.query),
    userController.getAllOrByQuery
);

router.get(
    '/:user_id',
    validateDataByDynamicParam(userValidator.userIdValidator, middlewareVars.params),
    getItemByDynamicParam(User, middlewareVars.user_id, middlewareVars.params, middlewareVars.id),
    throwIfItemExist(false),
    userController.getOneById
);
router.patch(
    '/:user_id',
    validateDataByDynamicParam(userValidator.userIdValidator, middlewareVars.params),
    validateDataByDynamicParam(userValidator.updateUserValidator),
    authMiddleware.validateAccessToken,
    getItemByDynamicParam(User, middlewareVars.user_id, middlewareVars.params, middlewareVars.id),
    throwIfItemExist(false),
    userMiddleware.checkUserPermission([]),
    getItemByDynamicParam(User, middlewareVars.email),
    throwIfItemExist(),
    userController.updateById
);
router.delete(
    '/:user_id',
    validateDataByDynamicParam(userValidator.userIdValidator, middlewareVars.params),
    authMiddleware.validateAccessToken,
    getItemByDynamicParam(User, middlewareVars.user_id, middlewareVars.params, middlewareVars.id),
    throwIfItemExist(false),
    userMiddleware.checkUserPermission(['admin']),
    userController.deleteById
);

module.exports = router;
