const router = require('express').Router();

const { authController } = require('../controllers');

router.get('/', authController.getLoginForm);
router.post('/', authController.loginUser);

module.exports = router;
