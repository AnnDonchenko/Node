const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares/index');

router.post('/', carMiddleware.checkUniqueModel, carController.create);
router.get('/', carController.getAllOrByQuery);
router.get('/:car_id', carMiddleware.isCarPresent, carController.getOneById);
router.patch('/:car_id', carMiddleware.isCarPresent, carMiddleware.checkUniqueModel, carController.updateById);
router.delete('/:car_id', carMiddleware.isCarPresent, carController.deleteById);

module.exports = router;
