const router = require('express').Router();

const { authController } = require('../controllers');
const {
    authMiddleware: {
        isUserEmailPresent,
        validateLoginationData
    }
} = require('../middlewares');

router.post(
    '/',
    validateLoginationData,
    isUserEmailPresent,
    authController.loginUser
);
router.get('/', authController.renderLoginForm);

module.exports = router;
