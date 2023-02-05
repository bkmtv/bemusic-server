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
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, SECRET);
    res.json({
       message: 'Successfully signed in',
       token,
       username
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
    res.json(req.user);
});

module.exports = router;