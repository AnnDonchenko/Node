const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/', userController.setNewUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getSingleUser);

module.exports = router;
