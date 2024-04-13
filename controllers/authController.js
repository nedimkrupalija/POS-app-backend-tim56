const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const generateJwtToken = require('./jwtController.js');

const { generateServerErrorResponse } = require('../utils/messages.js');

/*
* TODO: (zlendo1)
*  Why is this function not async?
*  Why force synchronicity and have to do then catch statements?
*  Please explain.
* */
function login(req, res) {
    const user = req.body;
    const whereCondition = user.phoneNumber ? { phoneNumber: user.phoneNumber } : { username: user.username };

    db.user.findOne({ where: whereCondition , include : db.location })
        .then(foundUser => {
            if (foundUser && foundUser.role === user.role || (foundUser.role === 'superadmin' && user.role === 'admin')) {
                bcrypt.compare(req.body.password, foundUser.password)
                    .then(match => {
                        if (match) {
                            const token = generateJwtToken(foundUser);

                            res.status(200).json({ userId : foundUser.id, token: token, phoneNumber: foundUser.phoneNumber, location : foundUser.Location});
                        } else {
                            res.status(400).json({ message: 'Invalid password' });
                        }
                    })
                    .catch(error => {
                        res.status(500).json(generateServerErrorResponse(error));
                    });
            } else {
                res.status(400).json({ message: 'User not found' });
            }
        })
        .catch(error => {
            res.status(500).json(generateServerErrorResponse(error));
        });
}

module.exports = { login };
