const db = require('../config/db.js');
const express = require('express');
const router = express.Router();

const Storage = db.storage


router.get('/', async (req, res) => {
    try {
        const storage = await Storage.findAll();
        res.json(storage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) =>{
    try{
        const storage = await Storage.create(req.body);
        res.json(storage);
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.put('/:id',async (req,res)=>{
    try{
        await Storage.update(req.body,{where: {id: req.params.id}});
        res.status(200).end();
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        await Storage.destroy({where: {id: req.params.id}});
        res.status(200).end();
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router
