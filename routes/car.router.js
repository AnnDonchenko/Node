const router = require('express').Router();

const { carController } = require('../controllers');
const { carValidator } = require('../validators');
const {
    carMiddleware: {
        checkUniqueModel,
        validateCarDataByDynamicParam,
        getCarByDynamicParam
    }
} = require('../middlewares');

router.post(
    '/',
    validateCarDataByDynamicParam(carValidator.createCarValidator),
    checkUniqueModel,
    carController.create
);
router.get(
    '/',
    validateCarDataByDynamicParam(carValidator.getCarsValidator, 'query'),
    carController.getAllOrByQuery
);

router.get(
    '/:car_id',
    validateCarDataByDynamicParam(carValidator.carIdValidator, 'params'),
    getCarByDynamicParam('car_id', 'params', '_id'),
    carController.getOneById
);
router.patch(
    '/:car_id',
    validateCarDataByDynamicParam(carValidator.carIdValidator, 'params'),
    validateCarDataByDynamicParam(carValidator.updateCarValidator),
    getCarByDynamicParam('car_id', 'params', '_id'),
    checkUniqueModel,
    carController.updateById
);
router.delete(
    '/:car_id',
    validateCarDataByDynamicParam(carValidator.carIdValidator, 'params'),
    getCarByDynamicParam('car_id', 'params', '_id'),
    carController.deleteById
);

module.exports = router;
