const request = require("supertest");

/**
 * This function is used to authenticate a test user for testing purposes.
 * It sends a POST request to the '/auth/login' endpoint with a predefined user's credentials.
 * After the request, it assigns the received token and cookie to the respective variables.
 *
 * @param {String|Server|Function} app - The application object.
 * @returns {Object} An object containing the token and cookie.
 */
async function authenticateTestUser(app){
    let token;
    let cookie;

    await request(app)
        .post('/auth/login')
        .send({
            username: 'neda',
            role: 'superadmin',
            password: 'test'
        }).then(response => {
            cookie = response.headers['set-cookie'];
            token = response.body.token;
        });

    return { token, cookie };
}

module.exports = { authenticateTestUser };