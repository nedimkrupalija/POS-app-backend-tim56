const jwt = require('jsonwebtoken')

const JWT_SECRET = require('../constants.js').JWT_SECRET

const verifyJWT = (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        const decoded = jwt.verify(token, JWT_SECRET)
        if (decoded.role === 'admin' || decoded.role === "superadmin") { //extend jwt expiration time for 30 minutes
            const extendedToken = jwt.sign({ ...decoded, exp: decoded.exp + (30 * 60) }, JWT_SECRET)
            console.log(extendedToken)
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


