const router = require("express").Router();
const controller = require("../controllers/auth.controller.js");
const checkAuth = require("../middlewares/auth.middleware.js");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/user", checkAuth, controller.user);

module.exports = router;