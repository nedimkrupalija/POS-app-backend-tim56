const session = require("express-session");

const app = require("../../config/app.js");

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "secret",
        cookie: {
            secure: false,
        },
    })
);

module.exports = app;
