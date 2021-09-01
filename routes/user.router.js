const router = require('express').Router();

const { userValidator } = require('../validators');
const { userController } = require('../controllers');
const {
    userMiddleware: {
        checkUniqueEmail,
        validateUserDataByDynamicParam,
        getUserByDynamicParam
    }
} = require('../middlewares');
const { middlewareVars } = require('../config');

router.post(
    '/',
    validateUserDataByDynamicParam(userValidator.createUserValidator),
    checkUniqueEmail,
    userController.create
);
router.get(
    '/',
    validateUserDataByDynamicParam(userValidator.getUsersValidator, middlewareVars.query),
    userController.getAllOrByQuery
);

router.get(
    '/:user_id',
    validateUserDataByDynamicParam(userValidator.userIdValidator, middlewareVars.params),
    getUserByDynamicParam(middlewareVars.user_id, middlewareVars.params, middlewareVars.id),
    userController.getOneById
);
router.patch(
    '/:user_id',
    validateUserDataByDynamicParam(userValidator.userIdValidator, middlewareVars.params),
    validateUserDataByDynamicParam(userValidator.updateUserValidator),
    getUserByDynamicParam(middlewareVars.user_id, middlewareVars.params, middlewareVars.id),
    checkUniqueEmail,
    userController.updateById
);
router.delete(
    '/:user_id',
    validateUserDataByDynamicParam(userValidator.userIdValidator, middlewareVars.params),
    getUserByDynamicParam(middlewareVars.user_id, middlewareVars.params, middlewareVars.id),
    userController.deleteById
);

module.exports = router;
