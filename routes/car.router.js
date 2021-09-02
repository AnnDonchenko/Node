const router = require('express').Router();

const { middlewareVars } = require('../config');
const { carController } = require('../controllers');
const { Car } = require('../dataBase');
const {
    generalMiddleware: {
        validateDataByDynamicParam,
        getItemByDynamicParam,
        throwIfItemExist
    }
} = require('../middlewares');
const { carValidator } = require('../validators');

router.post(
    '/',
    validateDataByDynamicParam(carValidator.createCarValidator),
    getItemByDynamicParam(Car, middlewareVars.model),
    throwIfItemExist(),
    carController.create
);
router.get(
    '/',
    validateDataByDynamicParam(carValidator.getCarsValidator, middlewareVars.query),
    carController.getAllOrByQuery
);

router.get(
    '/:car_id',
    validateDataByDynamicParam(carValidator.carIdValidator, middlewareVars.params),
    getItemByDynamicParam(Car, middlewareVars.car_id, middlewareVars.params, middlewareVars.id),
    throwIfItemExist(false),
    carController.getOneById
);
router.patch(
    '/:car_id',
    validateDataByDynamicParam(carValidator.carIdValidator, middlewareVars.params),
    validateDataByDynamicParam(carValidator.updateCarValidator),
    getItemByDynamicParam(Car, middlewareVars.car_id, middlewareVars.params, middlewareVars.id),
    throwIfItemExist(false),
    getItemByDynamicParam(Car, middlewareVars.model),
    throwIfItemExist(),
    carController.updateById
);
router.delete(
    '/:car_id',
    validateDataByDynamicParam(carValidator.carIdValidator, middlewareVars.params),
    getItemByDynamicParam(Car, middlewareVars.car_id, middlewareVars.params, middlewareVars.id),
    throwIfItemExist(false),
    carController.deleteById
);

module.exports = router;
