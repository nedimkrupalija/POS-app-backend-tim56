const request = require('supertest');
const app = require('./test-app/test.app.js');
const db = require('../config/db');

const Item = db.item;
const Location = db.location;

beforeAll(async () => {
    await db.sequelize.sync();
});

describe('Item CRUD functions', () => {
    let token;
    let cookie;

    let locationId;
    let itemId;

    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

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

    beforeAll(async () => {
        const location = await Location.create({ name: 'Test Location' });
        locationId = location.id;

        const item = await Item.create({ name: 'Test Item', LocationId: locationId });
        itemId = item.id;
    });

    describe('getItems', () => {
        it('should get all items', async () => {
            const res = await request(app)
                .get('/item')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('length');
        });
    });

    describe('createItem', () => {
        it('should create a new item', async () => {
            const res = await request(app)
                .post('/item')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({ name: 'New Item', LocationId: locationId });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
        });

        it('should not create an item without a location', async () => {
            const res = await request(app)
                .post('/item')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({ name: 'New Item' });

            expect(res.statusCode).toEqual(400);
        });
    });

    describe('getUniqueItem', () => {
        it('should get a unique item', async () => {
            const res = await request(app)
                .get(`/item/${itemId}`)
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', itemId);
        });

        it('should not get a non-existent item', async () => {
            const res = await request(app)
                .get('/item/9999')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(404);
        });
    });

    describe('updateItem', () => {
        it('should update an item', async () => {
            const res = await request(app)
                .put(`/item/${itemId}`)
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({ name: 'Updated Item' });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('name', 'Updated Item');
        });

        it('should not update a non-existent item', async () => {
            const res = await request(app)
                .put('/item/9999')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie)
                .send({ name: 'Updated Item' });

            expect(res.statusCode).toEqual(404);
        });
    });

    describe('deleteItem', () => {
        it('should delete an item', async () => {
            const res = await request(app)
                .delete(`/item/${itemId}`)
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(200);
        });

        it('should not delete a non-existent item', async () => {
            const res = await request(app)
                .delete('/item/9999')
                .set('Authorization', `${token}`)
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(404);
        });
    });

    afterAll(async () => {
        await Item.destroy({ where: { id: itemId } });
        await Location.destroy({ where: { id: locationId } });
    });
});

afterAll(async () => {
    await db.sequelize.close();
});