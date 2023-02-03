const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
    const token = req.header("token")
    if(!token) {
        return res.json({ error: "No token"})
    }
    try {
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err) {
                return res.json({ error: "Invalid token" })
            } else {
                req.user = decoded
                next()
            }
        })
    } catch (error) {
        console.error("Error with auth middleware")
        res.json({ error: "Server error" })
    }
}