const router = require("express").Router();
const { validateToken } = require("../middlewares/auth.middleware.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const SECRET = process.env.SECRET;

router.post("/login", async (req, res) => {
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
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET);
    res.json({
       message: 'Successfully signed in',
       token: token,
       username: username,
       id: user.id
    });
 });

router.post("/register", async (req, res) => {
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
          regDate: new Date().toLocaleString(),
       });
    })
    res.json({ message: "Registered successfully" })
 });

router.get("/user", validateToken, async (req, res) => {
   const username = req.user.username;
   const currentUser = await Users.findOne({ where: { username: username }});
   res.json(currentUser);
});

module.exports = router;