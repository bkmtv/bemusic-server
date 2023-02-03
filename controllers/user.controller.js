const UserSchema = require("../mongo/schemas/UserSchema.js");

const getUsers = async (req, res) => {
    const users = await UserSchema.find({});
    return res.json(users);
  }

module.exports = { getUsers }