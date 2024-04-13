const jwt = require('jsonwebtoken');

// Import the JWT secret key from the constants file
const JWT_SECRET = require('../utils/constants.js').JWT_SECRET;

/**
 * This function signs a payload with the JWT secret key.
 * If no options are provided, it will only use the payload and the secret key.
 * If options are provided, it will use the payload, the secret key, and the options.
 *
 * @param {Object} payload - The data you want to include in the token.
 * @param {Object} [options=null] - An object that can include options like expiresIn, algorithm, etc.
 * @returns {string} The JWT token.
 */
function sign(payload, options = null) {
    if (!options) {
        return jwt.sign(payload, JWT_SECRET);
    }

    return jwt.sign(payload, JWT_SECRET, options);
}

/**
 * Verify a JWT token with the JWT secret key.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {Object} The decoded payload if the token is valid.
 * @throws {Error} If the token is not valid.
 */
function verify(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    sign,
    verify
};
