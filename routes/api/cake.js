const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello cake route!')
});

module.exports = router;
