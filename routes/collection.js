const router = require("express").Router();
const { Collections } = require("../models");
const { validateToken } = require("../middlewares/auth.middleware.js");

router.get("/", async (req, res) => {
    const collections = await Collections.findAll();
    return res.json(collections);
});

router.get("/byuserId/:id", async (req, res) => {
    const id = req.params.id;
    const userColections = await Collections.findAll({ where: { UserId: id }});
    return res.json(userColections);
});

router.post("/", validateToken, async (req, res) => {
    const collection = req.body;
    collection.UserId = req.user.id;
    await Collections.create(collection);
    res.json(collection);
});

module.exports = router;