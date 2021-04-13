const { Router } = require("express");
const router = Router();

router.use("/user", require("./user"));
router.use('/goods', require('./goods'))
router.use('/order', require('./order'))

module.exports = router;
