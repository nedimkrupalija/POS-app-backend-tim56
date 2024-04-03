const db = require('../config/db.js');

const Location = db.location

async function getLocations(req,res){
    try {
        const locations = await Location.findAll();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createLocation(req,res){
    try {
        const location = await Location.create(req.body);
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateLocation(req,res){
    try {
        await Location.update(req.body, { where: { id: req.params.id } });
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteLocation(req,res){
    try {
        await Location.destroy({ where: { id: req.params.id } });
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getLocations,createLocation,updateLocation,deleteLocation};