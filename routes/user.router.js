const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/', userController.getByEmailOrName);
router.delete('/:user_id', userController.deleteCurrent);

module.exports = router;
