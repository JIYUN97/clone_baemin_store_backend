const { Router } = require("express");
const router = Router();
const ctrl = require("./user.ctrl");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/id", ctrl.findUserById);

module.exports = router;
