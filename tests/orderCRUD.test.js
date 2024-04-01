const request = require('supertest');
const app = require('./test-app/test.app.js');
const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
const db = require('../config/db.js');

const sequelize = new Sequelize("db_aa6c5b_sipos", "aa6c5b_sipos", "sipostim56", { host: "MYSQL6008.site4now.net", dialect: "mysql", dialectModule: mysql2, logging: false });

describe('Order API', () => {
    let token;
    let createdOrderId;
    beforeAll(async () => {
        await sequelize.authenticate();;
    });

    beforeAll(async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                username: 'testni-admin',
                role: 'admin',
                password: 'test'
            }).then(response => {
                token = response.body.token;
            });
    });

    describe('POST /orders', () => {
        it('should create a new order', async () => {
            const order = {
                status: 'placed',
                storageId: 1,
                items: [
                    { ItemId: 1, quantity: 2 },
                    { ItemId: 2, quantity: 3 },
                ],
            };
            const response = await request(app)
                .post('/orders')
                .set('Authorization', `${token}`)
                .send(order);
            createdOrderId = response.body.id;
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.status).toBe(order.status);
        });
    });

    describe('GET /orders', () => {
        it('should get all orders with details', async () => {
            const response = await request(app)
                .get('/orders')
                .set('Authorization', `${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('status');
            expect(response.body[0]).toHaveProperty('date');
            expect(response.body[0]).toHaveProperty('items');
            expect(response.body[0]).toHaveProperty('storage');
        });
    });

    describe('updateOrder', () => {
        it('should update an order', async () => {
            const order = {
                items: [
                    { ItemId: 1, quantity: 5 }
                ]
            };
            const response = await request(app)
                .put('/orders/' + createdOrderId)
                .set('Authorization', `${token}`)
                .send(order);
            const orderItem = await db.orderItem.findOne({ where: { OrderId: createdOrderId, ItemId: 1 } });
            expect(orderItem.quantity).toBe(5);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('id');
        });
    });

    describe('finishOrder', () => {
        it('should finish an order', async () => {
            const response = await request(app)
                .post('/orders'  + '/finish/' + createdOrderId)
                .set('Authorization', `${token}`);
            expect(response.statusCode).toBe(200);
            const order = await db.order.findByPk(createdOrderId);
            expect(order.status).toBe('processed');
            expect(response.body.message).toBe('Order sucessfully finished')
        });
    });

    describe('DELETE /orders/:id', () => {
        it('should delete an order', async () => {
            const response = await request(app)
                .delete('/orders/' + createdOrderId)
                .set('Authorization', `${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Order sucessfully deleted');
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });
});