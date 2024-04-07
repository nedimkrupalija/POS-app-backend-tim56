const db = require('../config/db.js');

const Location = db.location
const POS = db.pos
const Table = db.table;

async function getLocations(req,res){
    try {
        const locations = await Location.findAll({
            include: POS,
            include: db.storage
        });
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getLocationsUnique(req,res){
    const {id} = req.params
    try {
        const locations = await Location.findByPk(id,{
            include: POS
        });
        if(!locations){
            return res.status(404).json({message: 'Location not found'});
        }
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
        const location = await Location.findByPk(req.params.id);
        if(!location){
            return res.status(404).json({message: 'Location not found'});
        }
        await Location.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteLocation(req,res){
    try {
        const location = await Location.findByPk(req.params.id);
        if(!location){
            return res.status(404).json({message: 'Location not found'});
        }
        await Location.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ message: 'Location sucessfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getTablesForLocation(req,res){
    const {id} = req.params
    try {
        const location = await Location.findByPk(id);
        if(!location){
            return res.status(404).json({message: 'Location not found'});
        }
        const tables = await location.getTables();
        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createTablesForLocation (req,res){
    const id = req.params.id;
    const { tables } = req.body;
    const location = await Location.findByPk(id);
    if (!location) {
        return res.status(404).json({ message: 'Location not found' });
    }
    try {
    const createdTables = await Table.bulkCreate(tables.map(table => ({ ...table, LocationId: id })));
    res.status(201).json(createdTables);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getLocations,getLocationsUnique,createLocation,updateLocation,deleteLocation, getTablesForLocation, createTablesForLocation};