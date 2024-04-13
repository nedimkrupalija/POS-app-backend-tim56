const request = require('supertest');
const { authenticateTestUser } = require("../utils/testHelper");

const app = require('./test-app/test.app.js');
const db = require('../config/db.js');

const sequelize = db.sequelize;

describe('Admin CRUD functions', () => {
    let token;
    let cookie;

    let createdAdminId;

    beforeAll(async () => {
        ({ token, cookie } = await authenticateTestUser(app));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createAdmin', () => {
        it('should create a new admin', async () => {
            const response = await request(app)
                .post('/admin/administrators')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({
                    username: 'testadmin',
                    password: '1234',
                    phoneNumber: '387603137056',
                    role: 'admin'
                });

            createdAdminId = response.body.id;

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('username', 'testadmin');
            expect(response.body).toHaveProperty('password');
            expect(response.body).toHaveProperty('phoneNumber', '387603137056');
            expect(response.body).toHaveProperty('role', 'admin');
        });
    });

    describe('getAdmins', () => {
        it('should get all admins', async () => {
            const response = await request(app)
                .get('/admin/administrators')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body.some(admin => admin.id === createdAdminId)).toBe(true);
        });
    });

    describe('updateAdmin', () => {
        it('should update an admin', async () => {
            const response = await request(app)
                .put('/admin/administrators/' + createdAdminId)
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({
                    username: 'testadmin1',
                    password: '1234',
                    phoneNumber: '387613137056',
                    role: 'admin'
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('username', 'testadmin1');
            expect(response.body).toHaveProperty('password');
            expect(response.body).toHaveProperty('phoneNumber', '387613137056');
            expect(response.body).toHaveProperty('role', 'admin');
        });

        it('should not update non existing admin', async () => {
            const response = await request(app)
                .put('/admin/administrators/' + "45654646456")
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({
                    username: 'testadmin1',
                    password: '1234',
                    phoneNumber: '387613137056',
                    role: 'admin'
                });

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message', 'Admin not found');
        });
    });

    describe('deleteAdmin', () => {
        it('should delete an admin', async () => {
            const response = await request(app)
                .delete('/admin/administrators/' + createdAdminId)
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'Admin sucessfully deleted');
        });

        it('should not delete non existing admin', async () => {
            const response = await request(app)
                .delete('/admin/administrators/' + "54353453453453435")
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message', 'Admin not found');
        });

    });

    afterAll(async () => {
        await sequelize.close();
    });
});
