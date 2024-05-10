const { FORCE } = require('sequelize/lib/index-hints');
const app = require('./config/app.js');
const db = require('./config/db.js');

db.sequelize.sync();

db.user.create({
    username: 'neda',
    password: '$2a$10$LgbZr9yA/M8wM.Emsv199uUXoopkU5w4F4Wp0GUqi6hqjuw8t5TbG',
    role: 'superadmin'
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
