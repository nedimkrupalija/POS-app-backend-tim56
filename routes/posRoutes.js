const db = require('../config/db.js');
const express = require('express');
const router = express.Router();

const POS = db.POS

router.get('/',async(req,res)=>{
    try{
        const pos = await POS.findAll()
        res.json(pos)
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/', async (req, res) =>{
    try{
        const pos = await POS.create(req.body);
        res.json(pos);
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        await POS.update(req.body, { where: { id: req.params.id } });
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await POS.destroy({ where: { id: req.params.id } });
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router