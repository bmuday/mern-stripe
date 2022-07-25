const Product = require("../models/Product");
const fs = require("fs");

exports.createProduct = (req, res) => {
  const productObject = JSON.parse(req.body.product);
  delete productObject._id;
  const product = new Product({
    ...productObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  product
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.getProduct = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.updateProduct = (req, res) => {
  const productObject = req.file
    ? {
        ...JSON.parse(req.body.product),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Product.updateOne(
    { _id: req.params.id },
    { ...productObject, _id: req.params.id }
  )
    .then(() =>
      res.status(200).json({ message: "Product updated successfully!" })
    )
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      const filename = product.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Product.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Deleted!" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.deleteAllProducts = (req, res) => {
  Product.find({})
    .then((product) => {
      const filename = product.imageUrl.split("/images/")[1];
      fs.unlink(`images/`, () => {
        Product.deleteMany().then(() => {
          res.status(200).json({
            message: "Database has been cleared!",
          });
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
