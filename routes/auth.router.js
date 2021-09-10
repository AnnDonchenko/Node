const router = require('express').Router();

const { middlewareVars, tokenPurposeEnum } = require('../config');
const { authController } = require('../controllers');
const { User } = require('../dataBase');
const {
    authMiddleware,
    generalMiddleware: {
        validateDataByDynamicParam,
        getItemByDynamicParam,
        throwIfItemExist
    }
} = require('../middlewares');
const { authValidator } = require('../validators');

router.get('/', authController.renderLoginForm);

router.post(
    '/',
    validateDataByDynamicParam(authValidator.authValidator),
    getItemByDynamicParam(User, middlewareVars.email),
    throwIfItemExist(false),
    authController.loginUser
);

router.post(
    '/logout',
    authMiddleware.validateAccessToken,
    authController.logoutUser
);

router.post(
    '/refresh',
    authMiddleware.validateRefreshToken,
    authController.refresh
);

router.post(
    '/password/forgot',
    validateDataByDynamicParam(authValidator.authEmailValidator),
    getItemByDynamicParam(User, middlewareVars.email),
    throwIfItemExist(false),
    authController.passwordForgotSendEmail
);

router.patch(
    '/password/forgot',
    validateDataByDynamicParam(authValidator.authValidator),
    authMiddleware.validateActiveToken(tokenPurposeEnum.forgotPass),
    getItemByDynamicParam(User, middlewareVars.email),
    throwIfItemExist(false),
    authController.passwordForgotChange
);

router.patch(
    '/password/change',
    validateDataByDynamicParam(authValidator.authChangePassValidator),
    authMiddleware.validateAccessToken,
    authController.passwordChange
);

module.exports = router;
