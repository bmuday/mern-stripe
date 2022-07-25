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

// CREATE STUFF
router.post("/", auth, multer, createProduct);

// GET ONE STUFF(ID)
router.get("/:id", auth, getProduct);

// UPDATE ONE STUFF(ID)
router.put("/:id", auth, multer, updateProduct);

// DELETE ONE STUFF(ID)
router.delete("/:id", auth, deleteProduct);

// GET ALL STUFF
router.get("/", auth, getAllProducts);

// DELETE ALL STUFF
router.delete("/", auth, deleteAllProducts);

module.exports = router;
