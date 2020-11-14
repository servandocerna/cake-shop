const router = require('express').Router();

const cakeController = require('../../controllers/cake');

router.post('/', cakeController.create);

module.exports = router;
