const { verify } = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const validateToken = (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.json({error: "Unauthorized User"});
    try {
        const validToken = verify(token, SECRET);
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (error) {
        return res.json({ error: error });
    }
};

module.exports = { validateToken };