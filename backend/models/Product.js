const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
    sku: { type: String }, // implement scan barcode react native
    name: { type: String, required: true },
    description: { type: String }, // required true
    image_url: { type: String }, // required true
    list_price: { type: Number, required: true },
    sale_price: { type: Number }, // required true
    brand: { type: String, required: true },
    category: { type: String }, // required true
    average_product_rating: { type: Number }, // required true
    num_reviews: { type: Number }, // required true
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
