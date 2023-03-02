const router = require("express").Router();
const { Users, Collections } = require("../models");
const { validateToken } = require("../middlewares/auth.middleware.js");

router.get("/", async (req, res) => {
  const users = await Users.findAll();
  return res.json(users);
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  return res.json(user);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  await Users.update({ isAdmin: 1 }, { where: { id: id } });
  user.save();
  const users = await Users.findAll();
  res.send(users);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  await Users.update({ isAdmin: 0 }, { where: { id: id } });
  user.save();
  const users = await Users.findAll();
  res.send(users);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  await Users.destroy({ where: { id: id } });
  res.json("User deleted");
});

router.post("/:id/createcollection", validateToken, async (req, res) => {
  const collection = req.body;
  collection.UserId = req.params.id;
  await Collections.create(collection);
  res.json(collection);
});

module.exports = router;
