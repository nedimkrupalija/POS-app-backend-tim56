const db = require('../config/db.js');


const POS = db.pos
const StorageItem = db.storageItem
const Item = db.item

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
        return res.status(200).json(pos);
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updatePOS(req,res){
    try {
        const pos = await POS.findByPk(req.params.id);
        if(!pos){
            return res.status(404).json({message: 'Storage not found'});
        }
        await POS.update(req.body, { where: { id: req.params.id } });
        return res.status(200).json(pos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deletePOS(req,res){
    try {
        const pos = await POS.findByPk(req.params.id);
        if(!pos){
            return res.status(404).json({message: 'Storage not found'});
        }
        await POS.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ message: 'POS sucessfully deleted' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function checkoutPOS(req,res){
    const items = req.body.Items;
    try{
        for(const item of items){
           // const {id,StorageItem} = item;
            const {id,name,OrderItems} = item
            const {quantity} = OrderItems;

            const storageItem = await StorageItem.findOne({
                where: {itemId: id}
            });

            if(storageItem){
                if(storageItem.quantity >= quantity){
                await storageItem.update({quantity: storageItem.quantity - quantity})
                }else{
                    return res.status(400).json({message: 'Insufficient quantity in storage for item '+ name});
                }
            }else{
                return res.status(404).json({message: 'Storage item not found'});
            }
        }
        return res.status(200).json({ message: 'Storage updated' });
        
    }catch{
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getPOS,createPOS,updatePOS,deletePOS,checkoutPOS};