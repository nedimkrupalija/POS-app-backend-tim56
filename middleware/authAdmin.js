
const jwt = require('jsonwebtoken')

const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        const decoded = jwt.decode(token);
        if( decoded.role !== "superadmin" && decoded.role !== "admin"){
            return res.status(403).json({ message: 'Forbidden' });
        }
        
        next()
    } catch (error) {
       return res.status(401).json({
        message: 'Auth failed'
        })
    }
}


module.exports = verifyAdmin;


