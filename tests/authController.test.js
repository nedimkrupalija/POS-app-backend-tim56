const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes.js');
const app = express();

app.use(express.json());
app.use('/', authRoutes);

describe('POST /login', () => {
    it('responds with 200 json when login is successful', async () => {
        const response = await request(app)
            .post('/login')
            .send({
            username: "test",
            phoneNumber: "1234567890",
            password: "test",
            role: "user"
            })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('responds with 401 when password is invalid', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: "test",
                password: "wrong",
                role: "user"
            })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    });

    it('responds with 400 when user does not exist', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'nonexistent', password: 'test', role: 'user' })
            .set('Accept', 'application/json');
        console.log(response.body.message)
        expect(response.statusCode).toBe(400);
    });

    it('responds with 500 when no data is sent', async () => {
        const response = await request(app)
            .post('/login')
            .set('Accept', 'application/json');
        console.log(response.body.message)
        expect(response.statusCode).toBe(500);
    });
});