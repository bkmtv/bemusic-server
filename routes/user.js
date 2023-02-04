const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.getUsers);
router.delete("/:id", controller.deleteUser);

module.exports = router;