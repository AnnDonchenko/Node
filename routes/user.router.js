const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares/index');

router.post('/', userMiddleware.checkUniqueEmail, userController.create);
router.get('/', userController.getAllOrByQuery);
router.get('/:user_id', userMiddleware.isUserPresent, userController.getOneById);
router.patch('/:user_id', userMiddleware.isUserPresent, userMiddleware.checkUniqueEmail, userController.updateById);
router.delete('/:user_id', userMiddleware.isUserPresent, userController.deleteById);

module.exports = router;
