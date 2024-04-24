const db = require('../config/db.js');

const { generateServerErrorResponse } = require('../utils/messages.js');

const Order = db.order;

async function createOrder(req, res) {
    const { status, storageId, items } = req.body;

    const insertOrder = {
        status: status,
        date: Date.now(),
        StorageId: storageId
    };

    try {
        const order = await Order.create(insertOrder);

        await db.orderItem.bulkCreate(items.map(item =>
            ({ ...item, OrderId: order.id })
        ));

        return res.status(201).json(order);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function getOrders(req, res) {
    try {
        let orders = await Order.findAll();

        /*
        * TODO: (zlendo1)
        *  Only aesthetic changes were made to this code.
        *  It's a bit confusing as to why this wasn't done using (let's say) left join instead of server-side mapping.
        *  For now, I will need @kenankd to help me understand why it implemented this way.
        */
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
        res.status(500).json(generateServerErrorResponse(error));
    }
}


async function updateOrder(req, res) {
    const OrderId = req.params.id;
    const { items } = req.body;

    try {
        const order = await Order.findOne(
            { where: { id: req.params.id } }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.update(req.body);

        for (const item of items) {
            const ItemId = item.ItemId;

            const quantity = parseInt(item.quantity);

            if (quantity === 0) {
                await db.orderItem.destroy(
                    { where: { OrderId: req.params.id } }
                );
            } else {
                await db.orderItem.upsert({ OrderId, ItemId, quantity });
            }
        }

        const updatedOrder = await Order.findOne(
            { where: { id: OrderId } }
        );

        return res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function deleteOrder(req, res) {
    try {
        const order = await Order.findOne(
            { where: { id: req.params.id } }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.destroy();

        return res.status(200).json({ message: 'Order sucessfully deleted' });
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error));
    }
}

async function finishOrder(req, res) {
    try {
        const order = await Order.findOne(
            { where: { id: req.params.id } }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const StorageId = order.StorageId;

        let items = await order.getItems();

        items = items.map(item => item.dataValues);

        for (const item of items) {
            const ItemId = item.id;

            const quantity = parseInt(item.OrderItem.dataValues.quantity);

            const storageItem = await db.storageItem.findOne(
                { where: { StorageId, ItemId } }
            );

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
        res.status(500).json(generateServerErrorResponse(error));
    }
}


module.exports = { createOrder, getOrders, updateOrder, deleteOrder, finishOrder };
