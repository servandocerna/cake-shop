const router = require('express').Router();

const cakeRoutes = require('./cake');
router.use('/cakes', cakeRoutes);

module.exports = router;