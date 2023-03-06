const router = require("express").Router();
const { Items, Likes } = require("../models");

router.get("/", async (req, res) => {
  const items = await Items.findAll({
    limit: 5,
    order: [["createdAt", "DESC"]],
  });
  return res.json(items);
});

router.get("/search", async (req, res) => {
  const items = await Items.findAll({
    attributes: ["id", "name"],
  });
  return res.json(items);
});

router.get("/byitemId/:id", async (req, res) => {
  const id = req.params.id;
  const item = await Items.findByPk(id, {
    include: [
      {
        model: Likes,
      },
    ],
  });
  return res.json(item);
});

router.get("/:collectionId", async (req, res) => {
  const collectionId = req.params.collectionId;
  const collectionItems = await Items.findAll({
    where: { CollectionId: collectionId },
  });
  return res.json(collectionItems);
});

router.post("/:collectionId", async (req, res) => {
  const item = req.body;
  item.CollectionId = req.params.collectionId;
  await Items.create(item);
  res.json(item);
});

router.put("/:id/edit", async (req, res) => {
  const item = req.body;
  const id = req.params.id;
  await Items.update(item, { where: { id: id } });
  res.json(item);
});

router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  await Items.destroy({ where: { id: commentId } });
  res.json("Comment deleted");
});

module.exports = router;
