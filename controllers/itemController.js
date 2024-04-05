const db = require('../config/db');

const Item = db.item;
const Location = db.location;

async function getItems(req, res) {
    try {
        const items = await Item.findAll({ 
            include: db.location,
            attributes: { exclude: ['LocationId'] } 
        });
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUniqueItem(req, res) {
    try {
        const item = await Item.findByPk(req.params.id, { 
            include: db.location,
            attributes: { exclude: ['LocationId'] } 
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createItem(req, res) {
    try {
        const locationId = req.body.LocationId;
        if (!locationId) {
            return res.status(400).json({ message: 'Location is required' });
        }

        const location = await Location.findByPk(locationId);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        const item = await Item.create(req.body);
        const itemJSON = item.toJSON();
        
        delete itemJSON.LocationId;
        itemJSON.Location = location;
        
        res.status(201).json(itemJSON);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function updateItem(req, res) {
    try {
        const item = await Item.findOne({ where: { id: req.params.id } });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        if (req.body.LocationId) {
            const location = await Location.findByPk(req.body.LocationId);
            if (!location) {
                return res.status(404).json({ message: 'Location not found' });
            }
        }
        const updatedItem = await item.update(req.body);
        const location = await updatedItem.getLocation();

        const itemJSON = updatedItem.toJSON();
        delete itemJSON.LocationId;
        itemJSON.Location = location.toJSON();
        
        res.status(200).json(itemJSON);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function deleteItem(req, res) {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await item.destroy();
        res.status(200).json({ message: 'Item successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getItems, getUniqueItem, createItem, updateItem, deleteItem}