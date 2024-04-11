const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes.js');
const authRoutes = require('../routes/authRoutes.js');
const db = require('../config/db.js');

const app = express();
app.use(express.json());

app.use('/', userRoutes);
app.use('/auth', authRoutes);

describe('POST /tables', () => {
    let cookie;
    let token;

    beforeAll(async () => {
        await request(app)
            .post('/auth/login')
            .send({
                username: 'testni-admin',
                role: 'admin',
                password: 'test'
            })
            .then(response => {
                cookie = response.headers['set-cookie'];
                token = response.body.token;
            });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
    
    it('assigns tables to the user', async () => {
        const mockTables = [{ id: 1 }, { id: 2 }];
        const mockUser = { LocationId: 1 };
        const mockLocation = {};

        db.user.findByPk = jest.fn();
        db.location.findByPk = jest.fn();
        db.table.update = jest.fn();

        db.user.findByPk.mockResolvedValue(mockUser);
        db.location.findByPk.mockResolvedValue(mockLocation);
        db.table.update.mockResolvedValue([1]);

        const res = await request(app)
            .post('/tables')
            .set('Authorization', `${token}`)
            .send({ tables: mockTables });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Tables assigned successfully' });
    });
});