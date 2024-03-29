const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");

const productsRoutes = require("./routes/product");
const usersRoutes = require("./routes/user");

const auth = require("./middlewares/auth");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS POLICY
app.use(cors());

// Product ROUTES (protected by authentification)
app.use("/api/products", auth, productsRoutes);

// USER ROUTES
app.use("/api/users", usersRoutes);

// STATIC ASSETS(IMAGES)
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
