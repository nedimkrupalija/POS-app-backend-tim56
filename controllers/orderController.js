const db = require('../config/db.js');

async function createOrder (req, res) {
    const {status, storageId, items} = req.body;
    const insertOrder = { 
        status: status,
        date: Date.now(),
        StorageId: storageId
    };
    try {
        const order = await db.order.create(insertOrder);
        await db.orderItem.bulkCreate(items.map(item => ({...item, OrderId: order.id})));
        return res.status(201).json(order);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getOrders (req, res) {
    try {
        const orders = await db.order.findAll();
        return res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateOrder (req, res) {
    try {
        const order = await db.order.findOne({ where: { id: req.params.id } });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.update(req.body);
        return res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteOrder (req, res) {
    try {
        const order = await db.order.findOne({ where: { id: req.params.id } });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        return res.status(200).json({ message: 'Order sucessfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };

