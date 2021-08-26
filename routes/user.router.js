const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/', userController.create);
router.get('/', userController.getAllOrByQuery);
router.get('/:user_id', userController.getOneById);
router.patch('/:user_id', userController.updateById);
router.delete('/:user_id', userController.deleteById);

module.exports = router;
