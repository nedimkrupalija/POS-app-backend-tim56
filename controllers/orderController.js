const db = require('../config/db.js');

async function createOrder(req, res) {
    const { status, storageId, items } = req.body;
    const insertOrder = {
        status: status,
        date: Date.now(),
        StorageId: storageId
    };
    try {
        const order = await db.order.create(insertOrder);
        await db.orderItem.bulkCreate(items.map(item => ({ ...item, OrderId: order.id })));
        return res.status(201).json(order);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getOrders(req, res) {
    try {
        let orders = await db.order.findAll();
        const ordersWithDetails = await Promise.all(orders.map(async (order) => {
            let items = await order.getItems();
            items = items.map(item => {
                const { OrderItem, createdAt, updatedAt, LocationId, ...restItem } = item.dataValues;
                return { ...restItem, quantity: OrderItem.quantity };
            });
            const storage = await order.getStorage();
            delete order.dataValues.StorageId;
            return {...order.dataValues, items: items, storage: storage};
        }));
        return res.status(200).json(ordersWithDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function updateOrder(req, res) {
    const OrderId = req.params.id;
    const {items} = req.body;
    try {
        const order = await db.order.findOne({ where: { id: req.params.id } });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.update(req.body);
        for (const item of items) {
            const ItemId = item.ItemId;
            const quantity = parseInt(item.quantity);
            if (quantity === 0) {
                await db.orderItem.destroy({ where: { OrderId: req.params.id } });
            } else {
                await db.orderItem.upsert({ OrderId, ItemId, quantity });
            }
        }
        const updatedOrder = await db.order.findOne({ where: { id: OrderId } });
        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteOrder(req, res) {
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

async function finishOrder(req, res) {
    try {
        const order = await db.order.findOne({ where: { id: req.params.id } });
        const StorageId = order.StorageId;
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const storage= await db.storage.findOne({ where: { id: StorageId } });
        let items = await order.getItems();
        items = items.map(item => {return item.dataValues})
        console.log(items);
        for (const item of items) {
            const ItemId = item.id;
            const quantity = parseInt(item.OrderItem.dataValues.quantity);
            const storageItem = await db.storageItem.findOne({ where: { StorageId, ItemId } });
            if (storageItem) {
                const newQuantity = storageItem.quantity + quantity;
                await storageItem.update({ quantity: newQuantity });
            } else {
                await db.storageItem.create({ StorageId, ItemId, quantity });
            }
        }
        await order.update({ status: 'processed' });
        return res.status(200).json({ message: 'Order sucessfully finished' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { createOrder, getOrders, updateOrder, deleteOrder, finishOrder };
