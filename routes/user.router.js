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

router.post(
    '/',
    validateUserDataByDynamicParam(userValidator.createUserValidator),
    checkUniqueEmail,
    userController.create
);
router.get(
    '/',
    validateUserDataByDynamicParam(userValidator.getUsersValidator, 'query'),
    userController.getAllOrByQuery
);

router.get(
    '/:user_id',
    validateUserDataByDynamicParam(userValidator.userIdValidator, 'params'),
    getUserByDynamicParam('user_id', 'params', '_id'),
    userController.getOneById
);
router.patch(
    '/:user_id',
    validateUserDataByDynamicParam(userValidator.userIdValidator, 'params'),
    validateUserDataByDynamicParam(userValidator.updateUserValidator),
    getUserByDynamicParam('user_id', 'params', '_id'),
    checkUniqueEmail,
    userController.updateById
);
router.delete(
    '/:user_id',
    validateUserDataByDynamicParam(userValidator.userIdValidator, 'params'),
    getUserByDynamicParam('user_id', 'params', '_id'),
    userController.deleteById
);

module.exports = router;
