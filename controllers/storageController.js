const db = require('../config/db.js');

const Storage = db.storage


async function getStorage(req,res){
    try {
        const storage = await Storage.findAll();
        res.json(storage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getStorageUnique(req,res){
    try{
        const storage = await Storage.findByPk(req.params.id);
        if(!storage){
            return res.status(404).json({message: 'Storage not found'});
        }

        res.json(storage)
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createStorage(req,res){
    try{
        const storage = await Storage.create(req.body);
        res.json(storage);
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function updateStorage(req,res){
    try{
        await Storage.update(req.body,{where: {id: req.params.id}});
        res.status(200).end();
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteStorage(req,res){
    try{
        await Storage.destroy({where: {id: req.params.id}});
        res.status(200).end();
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getStorage,getStorageUnique,createStorage,updateStorage,deleteStorage};