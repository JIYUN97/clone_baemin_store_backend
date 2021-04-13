const { Router } = require("express");
const router = Router();

router.use("/user", require("./user"));
router.use('/goods', require('./goods'))

module.exports = router;
