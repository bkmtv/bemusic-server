const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
    if(!token) {
        return res.json({ message: 'No token'})
    }

    try {
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err) {
                return res.json({ message: 'Invalid token' })
            } else {
                req.user = decoded
                next()
            }
        })
    } catch (error) {
        console.error('Error with auth middleware')
        res.json({ message: 'Server error' })
    }
}