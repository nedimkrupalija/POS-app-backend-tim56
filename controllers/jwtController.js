const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../constants.js').JWT_SECRET

function generateJwtToken(user) {
    const role = user.role;
    const username = user.username;
    const id = user.id;
    const currentDate = new Date();
    const midnight = new Date(currentDate);
    midnight.setHours(24, 0, 0, 0);
    const untilMidnight = Math.floor((midnight.getTime() - currentDate.getTime()) / 1000).toString() + 's';
    const expiresIn = role === 'admin' || role === 'superadmin' ? '30m' : untilMidnight; // 30 minutes for admin, until the end of the day for others
    const token = jwt.sign({ id, role, username }, JWT_SECRET, { expiresIn });
    return token;
}

module.exports = generateJwtToken;
