const db = require('../config/db.js');
const express = require('express');
const router = express.Router();

const Location = db.location

router.get('/', async (req, res) => {
    try {
        const locations = await Location.findAll();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Location.update(req.body, { where: { id: req.params.id } });
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Location.destroy({ where: { id: req.params.id } });
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router