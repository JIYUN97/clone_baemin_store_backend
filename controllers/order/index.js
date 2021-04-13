const { Router } = require("express");
const router = Router();
const ctrl = require("./order.ctrl");

// 주문
router.post('/', ctrl.order);

module.exports = router;