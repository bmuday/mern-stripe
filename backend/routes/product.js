const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  deleteAllProducts,
} = require("../controllers/product");

const multer = require("../middlewares/multer-config");

// GET ALL PRODUCTS
router.get("/", getAllProducts);

// GET ONE PRODUCT(ID)
router.get("/:id", getProduct);

// CREATE PRODUCT
router.post("/", multer, createProduct);

// UPDATE ONE PRODUCT(ID)
router.put("/:id", multer, updateProduct);

// DELETE ONE PRODUCT(ID)
router.delete("/:id", deleteProduct);

// DELETE ALL PRODUCT
router.delete("/", deleteAllProducts);

module.exports = router;
