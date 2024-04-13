const db = require('../config/db.js');

const { generateServerErrorResponse } = require('../utils/messages.js');

async function getVAT(req, res) {
    try {
        const vat = await db.vat.findAll();

        return res.status(200).json(vat);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function updateVAT(req, res) {
    try {
        const vat = await db.vat.findByPk(req.params.id);

        if (!vat) {
            return res.status(404).json({ message: 'VAT not found' });
        }

        const updatedVAT = await db.vat.update(req.body,
            { where: { id: req.params.id } }
        );

        return res.status(200).json(updatedVAT);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function createVAT(req, res) {
    try {
        const vat = await db.vat.create(req.body);

        return res.status(200).json(vat);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function deleteVAT(req, res) {
    try {
        const vat = await db.vat.findByPk(req.params.id);

        if (!vat) {
            return res.status(404).json({ message: 'VAT not found' });
        }

        await db.vat.destroy({ where: { id: req.params.id } });

        return res.status(200).json({ message: 'VAT successfully deleted' });
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

module.exports = { getVAT, updateVAT, createVAT, deleteVAT };
