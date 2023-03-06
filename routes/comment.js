const router = require("express").Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/auth.middleware.js");

router.get("/", async (req, res) => {
  const allComments = await Comments.findAll({
    attributes: ["commentBody", "ItemId"],
  });
  res.json(allComments);
});

router.get("/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  const comments = await Comments.findAll({ where: { ItemId: itemId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  const userId = req.user.id;
  comment.username = username;
  comment.UserId = userId;
  await Comments.create(comment);
  res.json(comment);
});

router.delete("/:id", validateToken, async (req, res) => {
  const commentId = req.params.id;
  await Comments.destroy({ where: { id: commentId } });
  res.json("Comment deleted");
});

module.exports = router;
