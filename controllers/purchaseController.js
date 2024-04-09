const db = require('../config/db.js');

const Item = db.item
const Purchase = db.purchase
const VAT = db.vat

async function createPurchaseOrder(req, res) {
    try {
        const { items, tableId } = req.body;
        const itemIds = items.map(item => item.id);

        const itemList = await Item.findAll({
            where: { id: itemIds },
            include: [{ model: VAT }]
        });

        const itemListWithQuantity = itemList.map(item => {
            const selectedItem = items.find(selectedItem => selectedItem.id === item.id);
            if (selectedItem) {
                return { ...item.toJSON(), quantity: selectedItem.quantity };
            }
            return item.toJSON();
        });

        let total = 0, totalVat = 0;

        itemListWithQuantity.forEach(item => {
            const vatRate = item.VAT.percent;
            const itemTotal = item.quantity * item.sellingPrice;
            const itemVat = itemTotal * (vatRate / 100);

            total += itemTotal;
            totalVat += itemVat;
        });

        const grandTotal = total + totalVat;

        const purchaseOrder = await Purchase.create({
            items: itemListWithQuantity,
            tableId: tableId,
            totals: total,
            vat: totalVat,
            grandTotal: grandTotal
        });

        res.status(200).json(purchaseOrder);

    } catch {
        res.status(500).json({ message: 'Internal server error' });
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

async function updatePurchaseOrder(req, res) {
    try {
        const { items, tableId } = req.body;
        const itemIds = items.map(item => item.id);

        const itemList = await Item.findAll({
            where: { id: itemIds },
            include: [{ model: VAT }]
        });

        const itemListWithQuantity = itemList.map(item => {
            const selectedItem = items.find(selectedItem => selectedItem.id === item.id);
            if (selectedItem) {
                return { ...item.toJSON(), quantity: selectedItem.quantity };
            }
            return item.toJSON();
        });

        let total = 0, totalVat = 0;

        itemListWithQuantity.forEach(item => {
            const vatRate = item.VAT.percent;
            const itemTotal = item.quantity * item.sellingPrice;
            const itemVat = itemTotal * (vatRate / 100);

            total += itemTotal;
            totalVat += itemVat;
        });

        const grandTotal = total + totalVat;

        const purchaseOrder = await Purchase.findByPk(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        await purchaseOrder.update({
            items: itemListWithQuantity,
            tableId: tableId,
            totals: total,
            vat: totalVat,
            grandTotal: grandTotal
        });

        res.status(200).json(purchaseOrder);

    } catch {
        res.status(500).json({ message: 'Internal server error' });
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