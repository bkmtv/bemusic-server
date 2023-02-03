const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

const SECRET = process.env.SECRET;

const login = async (req, res) => {
   const { username, password } = req.body
   if (!username || !password) {
      return res.json({
         error: "Username and password are required",
      })
   };
   const user = await Users.findOne({ where: { username: username }});
   if (!user) {
      return res.json({
         error: "User doesn't exist",
      })
   };
   const checkHash = await bcrypt.compare(password, user.password)
   if (!checkHash) {
      return res.json({
         error: 'Wrong password',
      })
   };
   const payload = { id: user.id, username: user.username };
   const token = jwt.sign(payload, SECRET);
   res.json({
      message: 'Successfully signed in',
      token,
      username
   });
};

const register = async (req, res) => {
   const { username, password } = req.body
   if (!username || !password) {
      return res.json({
         error: 'Username and password are required',
      })
   };
   const userExist = await Users.findOne({ where: { username: username }});
   if (userExist) {
      return res.json({
         error: 'Username are taken',
      })
   };
   bcrypt.hash(password, 10).then((hash) => {
      Users.create({
         username: username,
         password: hash,
      });
   })
   res.json({ message: "Registered successfully" })
};

const user = async (req, res) => {
    req.user ? res.json(req.user) : res.json({ error: 'Unauthorized' })
};

module.exports = {
   login,
   register,
   user,
}