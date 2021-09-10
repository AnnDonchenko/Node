const router = require('express').Router();

const { middlewareVars, tokenPurposeEnum } = require('../config');
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
const { userValidator, authValidator } = require('../validators');

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
    userMiddleware.isAccountActivated,
    userController.getOneById
);

router.patch(
    '/:user_id',
    validateDataByDynamicParam(userValidator.userIdValidator, middlewareVars.params),
    validateDataByDynamicParam(userValidator.updateUserValidator),
    authMiddleware.validateAccessToken,
    getItemByDynamicParam(User, middlewareVars.user_id, middlewareVars.params, middlewareVars.id),
    throwIfItemExist(false),
    userMiddleware.isAccountActivated,
    userMiddleware.checkUserPermission(),
    userController.updateById
);

router.delete(
    '/:user_id',
    validateDataByDynamicParam(userValidator.userIdValidator, middlewareVars.params),
    authMiddleware.validateAccessToken,
    getItemByDynamicParam(User, middlewareVars.user_id, middlewareVars.params, middlewareVars.id),
    userMiddleware.isAccountActivated,
    throwIfItemExist(false),
    userMiddleware.checkUserPermission(['admin']),
    userController.deleteById
);

router.post(
    '/activateAccount',
    authMiddleware.validateActiveToken(tokenPurposeEnum.activateAccount),
    userController.activateAccount
);

router.post(
    '/admin/create',
    validateDataByDynamicParam(userValidator.createAdminValidator),
    authMiddleware.validateAccessToken,
    userMiddleware.checkUserPermission([
        'admin',
        'super admin'
    ]),
    getItemByDynamicParam(User, middlewareVars.email),
    throwIfItemExist(),
    userController.createAdmin
);

router.patch(
    '/admin/password/change',
    authMiddleware.validateActiveToken(tokenPurposeEnum.passwordChangeAdmin),
    validateDataByDynamicParam(authValidator.authPassValidator),
    userController.changePassAdmin
);

module.exports = router;
