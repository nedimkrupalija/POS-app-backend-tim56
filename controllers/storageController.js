const db = require('../config/db.js');

const { generateServerErrorResponse } = require('../utils/messages.js');

const Storage = db.storage;
const Location = db.location;
const Item = db.item;

async function getStorage(req, res) {
    try {
        const storage = await Storage.findAll();

        res.json(storage);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function getStorageUnique(req, res) {
    const { id } = req.params;

    try {
        const storage = await Storage.findByPk(id, {
            include: [
                { model: Location, attributes: ['name'] },
                { model: Item, attributes: ['id', 'name'] }
            ]
        });

        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }

        res.json(storage);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function createStorage(req, res) {
    try {
        const storage = await Storage.create(req.body);

        return res.status(200).json(storage);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function updateStorage(req, res) {
    try {
        const storage = await Storage.findByPk(req.params.id);

        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }

        const updatedStorage = await Storage.update(req.body,
            { where: { id: req.params.id } }
        );

        return res.status(200).json(updatedStorage);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function deleteStorage(req, res) {
    try {
        const storage = await Storage.findByPk(req.params.id);

        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }

        await Storage.destroy(
            { where: { id: req.params.id } }
        );

        return res.status(200).json({ message: 'Storage successfully deleted' });
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function getStorageStatus(req, res) {
    try {
        const storage = await Storage.findByPk(req.params.id);

        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }

        res.json({ status: storage.status });
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function getAvailableItemsForStorage(req, res) {
    try {
        const storage = await Storage.findByPk(req.params.id);

        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }

        const items = await storage.getItems();

        res.json(items);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

module.exports = {
    getStorage,
    getStorageUnique,
    createStorage,
    updateStorage,
    deleteStorage,
    getStorageStatus,
    getAvailableItemsForStorage
};
