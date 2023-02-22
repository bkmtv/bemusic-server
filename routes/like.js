const router = require("express").Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/auth.middleware.js");

router.post("/", validateToken, async (req, res) => {
  const { ItemId } = req.body;
  const UserId = req.user.id;
  const found = await Likes.findOne({
    where: { ItemId: ItemId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ ItemId: ItemId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: { ItemId: ItemId, UserId: UserId },
    });
    res.json({ liked: false });
  }
});

module.exports = router;
