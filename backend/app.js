const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS POLICY
app.use(cors());
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
}); */

// Product ROUTES
const productsRoutes = require("./routes/product");
app.use("/api/products", productsRoutes);

// USER ROUTES
const usersRoutes = require("./routes/user");
app.use("/api/users", usersRoutes);

// STATIC ASSETS(IMAGES)
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
