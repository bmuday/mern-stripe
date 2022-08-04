const Product = require("../models/Product");
const mongoose = require("mongoose");
// const fs = require("fs");

exports.getAllProducts = async (req, res) => {
  const user_id = req.user._id;

  try {
    const products = await Product.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error,
      auth: false,
    });
  }
};

exports.getProduct = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  try {
    const product = await Product.findOne({
      _id: id,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  const { name, brand, category, list_price } = req.body;
  // const product = new Product({
  //   ...productObject,
  //   image_url: `${req.protocol}://${req.get("host")}/images/${
  //     req.file.filename
  //   }`,
  // });
  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!brand) {
    emptyFields.push("brand");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!list_price) {
    emptyFields.push("list_price");
  }

  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: "Please fill in all the fields!", emptyFields });

  try {
    const user_id = req.user._id;
    // console.log(user_id)
    const product = await Product.create({
      name,
      brand,
      category,
      list_price,
      user_id,
    });
    res.status(201).json({ product, message: "Product saved successfully!" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  // const productObject = req.file
  //   ? {
  //       ...JSON.parse(req.body),
  //       image_url: `${req.protocol}://${req.get("host")}/images/${
  //         req.file.filename
  //       }`,
  //     }
  //   : { ...req.body };

  try {
    const product = await Product.updateOne({ _id: id }, { _id: id });
    res.status(200).json({ product, message: "Product updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllProducts = async (req, res) => {
  // const filename = product.image_url.split("/images/")[1];
  //     fs.unlink(`images/`, () => {
  //       });
  try {
    const products = await Product.deleteMany({});
    res.status(200).json({
      products,
      message: "Database has been cleared!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  // const filename = product.image_url.split("/images/")[1];
  // fs.unlink(`images/${filename}`, () => {
  //   Product.deleteOne({ _id: id })
  //     .then((product) =>
  //       res.status(200).json({ product, message: "Product deleted!" })
  //     )
  //     .catch((error) => res.status(400).json({ error: error.message }));
  // });

  try {
    const product = await Product.findByIdAndDelete({ _id: id });
    res.status(200).json({ product, message: "Product deleted!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
