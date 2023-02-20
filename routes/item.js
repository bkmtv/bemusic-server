const router = require("express").Router();
const { Items } = require("../models");

router.get("/", async (req, res) => {
    const items = await Items.findAll();
    return res.json(items);
});

router.get("/byitemId/:id", async (req, res) => {
    const id = req.params.id;
    const item = await Items.findByPk(id);
    return res.json(item);
});

router.get("/:collectionId", async (req, res) => {
    const collectionId = req.params.collectionId;
    const collectionItems = await Items.findAll({ where: { CollectionId: collectionId }});
    return res.json(collectionItems);
});

router.post("/:collectionId", async (req, res) => {
    const item = req.body;
    item.CollectionId = req.params.collectionId;
    await Items.create(item);
    res.json(item);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Items.destroy({ where: { id: id } });
    res.json("Comment deleted");
  });

module.exports = router;