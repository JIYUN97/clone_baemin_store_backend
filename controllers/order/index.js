const { Router } = require("express");
const router = Router();
const ctrl = require("./order.ctrl");
const validation = require("../../middlewares/validation");


// 주문
router.post('/', validation, ctrl.order_post);
<<<<<<< HEAD
=======
router.get('/', validation, ctrl.order_get)
>>>>>>> 1dcfae4f553df39f198ff03f1466949a5f20e093

module.exports = router;