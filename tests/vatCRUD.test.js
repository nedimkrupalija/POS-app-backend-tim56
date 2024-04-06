const request = require('supertest');
const app = require('../tests/test-app/test.app.js');
const db = require('../config/db.js');

describe('VAT Controller', () => {
    let token;
    let cookie;

    beforeAll(async () => {
        await request(app)
            .post('/auth/login')
            .send({
                username: 'testni-admin',
                role: 'admin',
                password: 'test'
            }).then(response => {
                cookie = response.headers['set-cookie'];
                token = response.body.token;
            });
    });

    afterAll(async () => {
        jest.clearAllMocks();
    });

    describe('getVAT', () => {
        it('returns all VATs when request is successful', async () => {
            const vat = [{ id: 1, name: 'VAT1', percent: 20 }];

            db.vat.findAll = jest.fn().mockResolvedValue(vat);

            const res = await request(app)
                .get('/vat')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(vat);
        });

        it('returns error when database query fails', async () => {
            db.vat.findAll = jest.fn().mockRejectedValue(new Error());

            const res = await request(app)
                .get('/vat')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({ message: 'Internal server error' });
        });
    });

    describe('createVAT', () => {
        it('creates a VAT when request is successful', async () => {
            const vat = { id: 1, name: 'VAT1', percent: 20 };

            db.vat.create = jest.fn().mockResolvedValue(vat);

            const res = await request(app)
                .post('/vat')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send(vat);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(vat);
        });

        it('returns error when database operation fails', async () => {
            db.vat.create = jest.fn().mockRejectedValue(new Error());

            const res = await request(app)
                .post('/vat')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({ name: 'VAT1', percent: 20 });

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({ message: 'Internal server error' });
        });
    });

    describe('updateVAT', () => {
        it('updates a VAT when request is successful', async () => {
            const vat = { id: 1, name: 'VAT1', percent: 20 };

            db.vat.findByPk = jest.fn().mockResolvedValue(vat);
            db.vat.update = jest.fn().mockResolvedValue([1]);

            const res = await request(app)
                .put('/vat/1')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send(vat);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(vat);
        });

        it('returns error when VAT is not found', async () => {
            db.vat.findByPk = jest.fn().mockResolvedValue(null);

            const res = await request(app)
                .put('/vat/1')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({ name: 'VAT1', percent: 20 });

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'VAT not found' });
        });

        it('returns error when database operation fails', async () => {
            db.vat.findByPk = jest.fn().mockResolvedValue({ id: 1, name: 'VAT1', percent: 20 });
            db.vat.update = jest.fn().mockRejectedValue(new Error());

            const res = await request(app)
                .put('/vat/1')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({ name: 'VAT1', percent: 20 });

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({ message: 'Internal server error' });
        });
    });

    describe('deleteVAT', () => {
        it('deletes a VAT when request is successful', async () => {
            db.vat.findByPk = jest.fn().mockResolvedValue({ id: 1, name: 'VAT1', percent: 20 });
            db.vat.destroy = jest.fn().mockResolvedValue(1);

            const res = await request(app)
                .delete('/vat/1')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({ message: 'VAT successfully deleted!' });
        });

        it('returns error when VAT is not found', async () => {
            db.vat.findByPk = jest.fn().mockResolvedValue(null);

            const res = await request(app)
                .delete('/vat/1')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'VAT not found' });
        });

        it('returns error when database operation fails', async () => {
            db.vat.findByPk = jest.fn().mockResolvedValue({ id: 1, name: 'VAT1', percent: 20 });
            db.vat.destroy = jest.fn().mockRejectedValue(new Error());

            const res = await request(app)
                .delete('/vat/1')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({ message: 'Internal server error' });
        });
    });
});