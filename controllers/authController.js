const bcrypt = require('bcryptjs');

const db = require('../config/db.js');
const generateJwtToken = require('./jwtController.js');

function login(req, res) {
    const user = req.body;
    const whereCondition = user.phoneNumber ? { phoneNumber: user.phoneNumber } : { username: user.username };

    db.user.findOne({ where: whereCondition })
        .then(foundUser => {
            if (foundUser && foundUser.role === user.role || (foundUser.role === 'superadmin' && user.role === 'admin')) {
                bcrypt.compare(req.body.password, foundUser.password)
                    .then(match => {
                        if (match) {
                            const token = generateJwtToken(foundUser);
                            req.session.role = foundUser.role;
                            res.status(200).json({ token: token, phoneNumber: foundUser.phoneNumber});
                        } else {
                            res.status(400).json({ message: 'Invalid password' });
                        }
                    })
                    .catch(err => {
                        
                        res.status(500).json({ message: 'Internal server error' });
                    });
            } else {
                res.status(400).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' });
        });
}




module.exports = { login};