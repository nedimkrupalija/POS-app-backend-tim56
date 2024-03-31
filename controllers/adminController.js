const db = require('../config/db.js');


async function getUsers(req, res) {
    try {
    
        const users = await db.user.findAll({where : { role: 'user' }});
        res.status(200).json(users);
    } catch (error) {
        
        res.status(500).json({ message: 'Internal server error' });
    }  
}   

async function getAdministrators(req, res) {
    try {
        const admins = await db.user.findAll({ where: { role: 'admin' } });
        return res.status(200).json(users);    
    } catch (error) {
         res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateUser(req, res) {
    try {
        const user = await db.user.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update(req.body);
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateAdministrator(req, res) {
    try {
        const admin = await db.user.findOne({ where: { id: req.params.id } });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        await admin.update(req.body);
        return res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteUser(req,res){
    try {
        const user = await db.user.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        return res.status(200).json({ message: 'User sucessfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteAdministrator(req,res){
    try {
        const admin = await db.user.findOne({ where: { id: req.params.id } });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        await admin.destroy();
        return res.status(200).json({ message: 'Admin sucessfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createUser(req, res) {
    try {
        const user = await db.user.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createAdministrator(req, res) {
    try {
        const admin = await db.user.create(req.body);
        return res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}







module.exports = { getUsers, getAdministrators, updateUser, updateAdministrator, deleteUser, deleteAdministrator, createUser, createAdministrator};