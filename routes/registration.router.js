const router = require('express').Router();

const { registrationController } = require('../controllers');

router.get('/', registrationController.getRegistrationForm);

module.exports = router;
