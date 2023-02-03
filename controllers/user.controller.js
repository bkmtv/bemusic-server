const { Users } = require("../models");

const getUsers = async (req, res) => {
    const users = await Users.findAll();
    return res.json(users);
  }

module.exports = { getUsers }