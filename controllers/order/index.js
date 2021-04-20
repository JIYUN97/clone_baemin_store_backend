const { Router } = require("express");
const router = Router();
const ctrl = require("./order.ctrl");
const validation = require("../../middlewares/validation");

// 주문
router.post('/', validation, ctrl.order_post);
router.get('/', validation, ctrl.order_get)

module.exports = router;