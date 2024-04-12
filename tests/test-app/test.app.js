const express = require("express");
const session = require("express-session");

const adminRoutes = require("../../routes/adminRoutes.js");
const authRoutes = require("../../routes/authRoutes.js");
const orderRoutes = require("../../routes/orderRoutes.js");
const authMiddleware = require("../../middleware/authMiddleware.js");
const itemRoutes = require("../../routes/itemRoutes.js");
const locationRoutes = require("../../routes/locationRoutes.js");
const storageRoutes = require("../../routes/storageRoutes.js");
const vatRoutes = require("../../routes/vatRoutes.js");
const purchaseRoutes = require("../../routes/purchaseRoutes.js");

const app = express();
app.use(express.json());
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
app.use("/auth", authRoutes);
app.use("/admin", authMiddleware.verifyJWT, adminRoutes);
app.use("/item", authMiddleware.verifyJWT, itemRoutes);
app.use("/orders", authMiddleware.verifyJWT, orderRoutes);
app.use("/location", authMiddleware.verifyJWT, locationRoutes);
app.use("/storage", authMiddleware.verifyJWT, storageRoutes);
app.use("/vat", authMiddleware.verifyJWT, vatRoutes);
app.use("/purchase", authMiddleware.verifyJWT, purchaseRoutes);

module.exports = app;
