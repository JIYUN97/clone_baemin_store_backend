const { Router } = require('express');
const router = Router()

router.use('/goods', require('./goods'));

module.exports = router;