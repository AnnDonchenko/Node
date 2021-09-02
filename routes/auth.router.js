const router = require('express').Router();

const { middlewareVars } = require('../config');
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

router.post(
    '/',
    validateDataByDynamicParam(authValidator.authValidator),
    getItemByDynamicParam(User, middlewareVars.email),
    throwIfItemExist(false),
    authController.loginUser
);
router.get('/', authController.renderLoginForm);

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

module.exports = router;
