const router = require('express').Router();
const { storeCakeValidator } = require('./validators');

const cakeController = require('../../controllers/cake');

router.post('/', storeCakeValidator, cakeController.create);
router.get('/', cakeController.find);
router.get('/:id', cakeController.findById);
router.put('/:id', cakeController.update);
router.delete('/:id', cakeController.findByIdAndDelete);

module.exports = router;
