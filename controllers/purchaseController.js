const db = require('../config/db.js');

const Item = db.item
const Purchase = db.purchase

async function createPurchaseOrder (req,res) {
    try{
        const {items,tableId} = req.body;
        const itemIds = items.map(item => item.id);

        const ItemList = await Item.findAll(({where: {id: itemIds}}));
        
        let total = 0,totalVat = 0;
      //  const vat = 0.2; // used for test, until issue 66 isn't done

        ItemList.array.forEach(item => {
            const selectedItem = items.find(selectedItem => selectedItem.id === item.id);
            total += selectedItem.quantity * item.sellingPrice ;
        });
        totalVat = total * 0.2;
        const grandTotal = total+totalVat;

        const purchaseOrder = await Purchase.create({
            items: items,
            tableId: tableId,
            totals: total,
            vat: totalVat,
            grandTotal: grandTotal
        })

        res.status(200).json(purchaseOrder)
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
}

async function getAllPurchaseOrders(req,res){
    try{
        const purchaseOrders = await Purchase.findAll();
        res.status(200).json(purchaseOrders);
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
}


async function getPurchaseOrderById(req,res){
    try{
        const purchaseOrder = await Purchase.findByPk(req.params.id);
        if(!purchaseOrder){
            res.status(404).json({message: 'Purshase order not found'});
        }else{
            res.status(200).json(purchaseOrder);
        }
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
}

async function updatePurchaseOrder(req,res){
    try{
        const {items, tableId} = req.body;

        const itemIds = items.map(item => item.id);
        const itemList = await Item.findAll({where: {id: itemIds}});

        let total = 0,totalVat = 0;
        //  const vat = 0.2; // used for test, until issue 66 isn't done
  
        itemList.forEach(item => {
              const selectedItem = items.find(selectedItem => selectedItem.id === item.id);
              total += selectedItem.quantity * item.sellingPrice ;
          });
          totalVat = total * 0.2;
          const grandTotal = total+totalVat;

          const purchaseOrder = await Purchase.findByPk(req.params.id);
          if(!purchaseOrder){
            res.status(404).json({message: 'Purshase order not found'});
          }else{
            await purchaseOrder.update({
                items: items,
                tableId: tableId,
                totals: total,
                vat: totalVat,
                grandTotal: grandTotal
            });
            res.status(200).json(purchaseOrder);
          }
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
}

async function deletePurchaseOrder(req,res){
    try{
        const purchaseOrder = await Purchase.findByPk(req.params.id);
        if(!purchaseOrder){
            res.status(404).json({message: 'Purchase not found'});
        }else{
            await purchaseOrder.destroy();
            res.status(200).end()
        }
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {createPurchaseOrder,getAllPurchaseOrders,getPurchaseOrderById,updatePurchaseOrder,deletePurchaseOrder};