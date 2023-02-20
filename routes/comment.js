const router = require("express").Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/auth.middleware.js");

router.get("/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  const comments = await Comments.findAll({ where: { ItemId: itemId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } });
  res.json("Comment deleted");
});

module.exports = router;