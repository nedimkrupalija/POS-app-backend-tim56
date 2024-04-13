const request = require('supertest');
const express = require('express');

const locationRoutes = require('../routes/locationRoutes');

const db = require('../config/db.js');

jest.mock('../config/db.js', () => ({
    location: {
        findByPk: jest.fn(),
    },
    table: {
        bulkCreate: jest.fn(),
    },
}));

jest.mock('../middleware/authAdmin.js', () => {
    return (req, res, next) => {
        req.user = {
            id: 1,
            role: 'admin',
        };
        next();
    };
});

const app = express();

app.use(express.json());

app.use('/', locationRoutes);

describe('GET /:id/tables', () => {
    it('returns the tables for the location', async () => {
        const mockTables = [{ id: 1, name: 'Table 1' }, { id: 2, name: 'Table 2' }];

        db.location.findByPk.mockResolvedValue({
            getTables: jest.fn().mockResolvedValue(mockTables),
        });

        const res = await request(app).get('/1/tables');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockTables);
    });
});

describe('POST /:id/tables', () => {
    it('creates tables for the location', async () => {
        const mockTables = [{ id: 1, name: 'Table 1' }, { id: 2, name: 'Table 2' }];

        db.location.findByPk.mockResolvedValue({});
        db.table.bulkCreate.mockResolvedValue(mockTables);

        const res = await request(app).post('/1/tables').send({ tables: mockTables });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(mockTables);
    });
});