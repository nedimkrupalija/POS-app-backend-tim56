const express = require('express');
const bcrypt = require('bcrypt');

const db = require('../config/db.js');
const generateJwtToken = require('../controllers/jwt.controller.js');

const router = express.Router();

router.post('/login', (req, res) => {
    const user = req.body;
    const whereCondition = user.phoneNumber ? { phoneNumber: user.phoneNumber } : { username: user.username };
    db.user.findOne({ where: whereCondition })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(match => {
                        if (match) {
                            const token = generateJwtToken(user);
                            res.status(200).json({ token: token });
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
});

module.exports = router;