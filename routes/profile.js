const router = require("express").Router();
const { Users } = require("../models");

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

module.exports = router;
