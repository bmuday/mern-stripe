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
const auth = require("../middlewares/auth");

const multer = require("../middlewares/multer-config");

// Private routes
// GET ALL PRODUCTS
router.get("/", auth, getAllProducts);

// GET ONE PRODUCT(ID)
router.get("/:id", auth, getProduct);

// CREATE PRODUCT
router.post("/", auth, multer, createProduct);

// UPDATE ONE PRODUCT(ID)
router.put("/:id", auth, multer, updateProduct);

// DELETE ONE PRODUCT(ID)
router.delete("/:id", auth, deleteProduct);

// DELETE ALL PRODUCT
router.delete("/", auth, deleteAllProducts);

module.exports = router;
