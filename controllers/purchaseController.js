const db = require('../config/db.js');

const { generateServerErrorResponse } = require('../utils/messages.js');
const { deleteVAT } = require('./vatController.js');

const Item = db.item
const Purchase = db.purchase
const PurchaseItem = db.purchaseItem
const Table = db.table
const VAT = db.vat
const Location = db.location

async function calculateTotals(items) {
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

    return { itemListWithQuantity, total, totalVat, grandTotal };
}

async function createPurchaseOrder(req, res) {
    try {
        const { items, tableId, locationId } = req.body;

        

        const { itemListWithQuantity, total, totalVat, grandTotal } = await calculateTotals(items);

        

        const purchaseOrder = await Purchase.create({
            TableId: tableId,
            totals: total,
            vat: totalVat,
            status: 'pending',
            LocationId: locationId,
            grandTotal: grandTotal
        });

        await db.purchaseItem.bulkCreate(items.map(item => ({
            PurchaseId: purchaseOrder.id,
            ItemId: item.id,
            quantity: item.quantity
        })));


        res.status(200).json(purchaseOrder);

    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}


async function getAllPurchaseOrders(req,res){
    try {
        
        const purchaseOrders = await Purchase.findAll({include: [Location, Table, Item]});

        purchaseOrders.forEach(async purchaseOrder => {
            const items = await purchaseOrder.getItems();
            purchaseOrder.dataValues.items = items;
        });

        res.status(200).json(purchaseOrders);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}


async function getPurchaseOrderById(req,res){
    try {
        const purchaseOrder = await Purchase.findByPk(req.params.id);

        purchaseOrder.dataValues.items = await purchaseOrder.getItems();

        if (!purchaseOrder){
            res.status(404).json({ message: 'Purshase order not found' });
        } else {
            res.status(200).json(purchaseOrder);
        }
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function updatePurchaseOrder(req, res) {
    try {
        const { items, tableId } = req.body;

        const { itemListWithQuantity, total, totalVat, grandTotal } = await calculateTotals(items);

        const purchaseOrder = await Purchase.findByPk(req.params.id);

        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        await purchaseOrder.update({
            items: itemListWithQuantity,
            tableId: tableId,
            totals: total,
            vat: totalVat,
            status: req.body.status,
            grandTotal: grandTotal
        });

        res.status(200).json(purchaseOrder);

    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}
async function deletePurchaseOrder(req,res){
    try {
        const purchaseOrder = await Purchase.findByPk(req.params.id);



        if (!purchaseOrder) {
            res.status(404).json({ message: 'Purchase not found' });
        } else {

            purchaseOrder.getItems().then(async items => {
                await Promise.all(items.map(async item => {
                    await item.destroy();
                }));
            }); 

            await purchaseOrder.destroy();

            res.status(200).end()
        }
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}


async function updatePurchaseStatus(req, res) {
    try {
        const purchaseOrder = await Purchase.findByPk(req.params.id);

        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        await purchaseOrder.update({
            status: req.body.status
        });

        res.status(200).json(purchaseOrder);

    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}


async function getPurchaseOrderByLocationId(req,res){
    try {
        const purchaseOrders = await Purchase.findAll({
            where: { locationId: req.params.id },
            include: [Location, Table, Item]
        });

        purchaseOrders.forEach(async purchaseOrder => {
            const items = await purchaseOrder.getItems();
            purchaseOrder.dataValues.items = items;
        });

        res.status(200).json(purchaseOrders);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

module.exports = {createPurchaseOrder,getAllPurchaseOrders,getPurchaseOrderById,updatePurchaseOrder,deletePurchaseOrder, updatePurchaseStatus, getPurchaseOrderByLocationId};
