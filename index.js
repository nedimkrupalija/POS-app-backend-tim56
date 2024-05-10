const { FORCE } = require('sequelize/lib/index-hints');
const app = require('./config/app.js');
const db = require('./config/db.js');
const { pathsToModuleNameMapper } = require('ts-jest');

const PORT = process.env.PORT || 3000;


 db.sequelize.sync({force : true}).then(async () => {

    await db.location.create({
        name: 'Frizerski salon FS',
        address: 'Zmaja od Bosne bb.'
        
    });

    await db.user.create({
        username: 'neda',
        password: '$2a$10$LgbZr9yA/M8wM.Emsv199uUXoopkU5w4F4Wp0GUqi6hqjuw8t5TbG',
        phoneNumber: '062012374',
        role: 'superadmin'
    });

   

    await db.user.create({
        username: 'test',
        password: '$2a$10$LgbZr9yA/M8wM.Emsv199uUXoopkU5w4F4Wp0GUqi6hqjuw8t5TbG',
        phoneNumber: '852818',
        role: 'user',
        LocationId: 1
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    
})





module.exports = app;
