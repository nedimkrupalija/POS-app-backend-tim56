

const verifyAdmin = (req, res, next) => {
    try {
        
        if(!req.session.role && req.session.role !== "superadmin" && req.session.role !== "admin"){
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


