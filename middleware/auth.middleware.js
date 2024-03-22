const jwt = require('jsonwebtoken')

const JWT_SECRET = require('../constants.js').JWT_SECRET

const verifyJWT= (req, res, next) => {
    try {
        const token = req.headers["Authorization"]
        const decoded = jwt.verify(token, JWT_SECRET)
        if (req.userData.role === 'admin') {
            const extendedToken = jwt.sign({ ...decoded, exp: Math.floor(Date.now() / 1000) + (30 * 60) }, JWT_SECRET)
            console.log(extendedToken);
            req.headers["Authorization"] = extendedToken
        }
        req.userData = decoded
        next()
    } catch (error) {
        return res.status(401).json({
        message: 'Auth failed'
        })
    }
}


module.exports = verifyJWT;


