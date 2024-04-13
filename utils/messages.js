/**
 * Generates a server error JSON response.
 * If an error object is provided, its message is included in the response.
 *
 * @param {Error} [error=null] - The error object.
 * @returns {Object} The server error JSON response.
 */
const generateServerErrorResponse = (error = null) => {
    return {
        message: 'Internal server error' + (error && error.message && error.message.length !== 0 ? `: ${error.message}` : '')
    };
};

module.exports = {
    generateServerErrorResponse
};
