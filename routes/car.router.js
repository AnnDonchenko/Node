const router = require('express').Router();

const { carController } = require('../controllers');
const {
    carMiddleware: {
        checkUniqueModel,
        isCarPresent,
        validateCarBodyForCreate,
        validateCarBodyForUpdate,
        validateCarQuery,
        validateIdParams
    }
} = require('../middlewares');

router.post('/', validateCarBodyForCreate, checkUniqueModel, carController.create);
router.get('/', validateCarQuery, carController.getAllOrByQuery);

router.get('/:car_id', validateIdParams, isCarPresent, carController.getOneById);
router.patch('/:car_id', validateIdParams, validateCarBodyForUpdate,
    isCarPresent, checkUniqueModel, carController.updateById);
router.delete('/:car_id', validateIdParams, isCarPresent, carController.deleteById);

module.exports = router;
