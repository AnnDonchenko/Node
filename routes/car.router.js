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
const { middlewareVars } = require('../config');

router.post(
    '/',
    validateCarDataByDynamicParam(carValidator.createCarValidator),
    checkUniqueModel,
    carController.create
);
router.get(
    '/',
    validateCarDataByDynamicParam(carValidator.getCarsValidator, middlewareVars.query),
    carController.getAllOrByQuery
);

router.get(
    '/:car_id',
    validateCarDataByDynamicParam(carValidator.carIdValidator, middlewareVars.params),
    getCarByDynamicParam(middlewareVars.car_id, middlewareVars.params, middlewareVars.id),
    carController.getOneById
);
router.patch(
    '/:car_id',
    validateCarDataByDynamicParam(carValidator.carIdValidator, middlewareVars.params),
    validateCarDataByDynamicParam(carValidator.updateCarValidator),
    getCarByDynamicParam(middlewareVars.car_id, middlewareVars.params, middlewareVars.id),
    checkUniqueModel,
    carController.updateById
);
router.delete(
    '/:car_id',
    validateCarDataByDynamicParam(carValidator.carIdValidator, middlewareVars.params),
    getCarByDynamicParam(middlewareVars.car_id, middlewareVars.params, middlewareVars.id),
    carController.deleteById
);

module.exports = router;
