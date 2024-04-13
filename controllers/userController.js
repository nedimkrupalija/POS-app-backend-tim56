const jwt = require('jsonwebtoken');
const db = require('../config/db.js');

const { generateServerErrorResponse } = require('../utils/messages.js');

const User = db.user;
const Table = db.table;
const Location = db.location;

async function assignTables(req,res){
    try {
        const { tables } = req.body;

        const token = req.headers["authorization"]
        const decoded = jwt.decode(token);
        const id = decoded.id;

        const user = await User.findByPk(id);

        const location = await Location.findByPk(user.LocationId);

        if(!location){
            return res.status(404).json({ message: 'Location not found' });
        }

        for (const element of tables) {
            await Table.update({ UserId: id },
                { where: { id: element, LocationId: user.LocationId } }
            );
        }

        res.send({ message: 'Tables assigned successfully' });
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function unassignTabels(req, res){
    try {
        const { tables } = req.body;

        const token = req.headers["authorization"]
        const decoded = jwt.decode(token);
        const userId =  decoded.id;

        const user = await User.findByPk(userId);

        for (const element of tables) {
            await Table.update({ UserId: null },
                { where: { id: element, LocationId: user.LocationId } }
            );
        }

        return res.status(200).json({ message: 'Tables unassigned successfully' });
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error)); 
    }
}

module.exports = { assignTables, unassignTabels };
