const db = require('../config/db.js');


const POS = db.pos

async function getPOS(req,res){
    try{
        const pos = await POS.findAll()
        res.json(pos)
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createPOS(req,res){
    try{
        const pos = await POS.create(req.body);
        res.json(pos);
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updatePOS(req,res){
    try {
        await POS.update(req.body, { where: { id: req.params.id } });
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deletePOS(req,res){
    try {
        await POS.destroy({ where: { id: req.params.id } });
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getPOS,createPOS,updatePOS,deletePOS};