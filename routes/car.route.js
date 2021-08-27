const router = require('express').Router();

const carController = require('../controllers/car.controller');
const carMiddleware = require('../middlewares/car.middleware');

router.post('/', carMiddleware.checkUniqueBrand, carMiddleware.checkPriceBiggerThenZero,
    carMiddleware.checkYearInRange, carController.create);
router.get('/', carController.getAll);
router.get('/:car_id', carMiddleware.isCarPresent, carController.getOneById);

module.exports = router;
