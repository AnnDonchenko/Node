const router = require('express').Router();

const { userController } = require('../controllers');
const {
    userMiddleware: {
        checkUniqueEmail,
        isUserPresent,
        validateUserBodyForCreate,
        validateUserBodyForUpdate,
        validateUserQuery,
        validateIdParams
    }
} = require('../middlewares');

router.post('/', validateUserBodyForCreate, checkUniqueEmail, userController.create);
router.get('/', validateUserQuery, userController.getAllOrByQuery);
router.get('/:user_id', validateIdParams, isUserPresent, userController.getOneById);
router.patch('/:user_id', validateIdParams, validateUserBodyForUpdate,
    isUserPresent, checkUniqueEmail, userController.updateById);
router.delete('/:user_id', validateIdParams, isUserPresent, userController.deleteById);

module.exports = router;
