const session = require('express-session');
const cors = require('cors');

const app = require('./config/app.js');
const db = require('./config/db.js');

db.sequelize.sync();

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
}));

app.use(cors());

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
