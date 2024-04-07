const db = require('../config/db.js');
const jwt = require('jsonwebtoken');

const User = db.user;
const Table = db.table;
const Location = db.location;

async function assignTables(req,res){
    try {
        const {tables} = req.body;
        const token = req.headers["authorization"]
        const decoded = jwt.decode(token);
        const id = decoded.id;
        const user = await User.findByPk(id);
        const location = await Location.findByPk(user.LocationId);
        if(!location){
            return res.status(404).json({message: 'Location not found'});
        }
        tables.forEach(async element => {
            await Table.update({ UserId: id }, { where: { id: element, LocationId: user.LocationId } });
        });
        res.send({message: 'Tables assigned successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={assignTables}