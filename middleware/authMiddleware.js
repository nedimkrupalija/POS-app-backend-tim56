const jwtHelper = require('../utils/jwtHelper.js');

const verifyJWT = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        const decoded = jwtHelper.verify(token);

        if (decoded.role === 'admin' || decoded.role === "superadmin") {
            // Extend the expiration time of the token by 30 minutes
            req.headers["Authorization"] = jwtHelper.sign({ ...decoded, exp: decoded.exp + (30 * 60) });
        }

        req.userData = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
}

const addJwtHeader = (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Expose-Headers', 'Authorization');

    res.setHeader('Authorization', `${req.headers["Authorization"]}`);

    next();
};


module.exports = {
    verifyJWT,
    addJwtHeader
};
