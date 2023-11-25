const jwt = require('jsonwebtoken');

const middlewareToken = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        const secretKey = process.env.KEY_SECURE_JWT
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, secretKey, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Token is not valid' })
                }
                req.user = user
                next()
            });
        } else {
            res.status(401).json({ message: "You're not authenticated" })
        }
    },

    verifyTokenAdmin: (req, res, next) => {
        middlewareToken.verifyToken(req, res, () => {
            if (req.user.admin) {
                next()
            } else {
                res.status(401).json({ message: "You're not allowed" })
            }
        })
    }
}

module.exports = middlewareToken