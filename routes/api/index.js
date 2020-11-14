const router = require('express').Router();

const { storeCakeValidator } = require('./validators');

const cakeRoutes = require('./cake');
router.use('/cakes', storeCakeValidator, cakeRoutes);

module.exports = router;