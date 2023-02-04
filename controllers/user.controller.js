const { Users } = require("../models");

const getUsers = async (req, res) => {
  const users = await Users.findAll();
  return res.json(users);
}

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  await Users.destroy({ where: { id: id } });
  user.save();
  const users = await Users.findAll();
  res.send(users);
}

module.exports = { getUsers, deleteUser }