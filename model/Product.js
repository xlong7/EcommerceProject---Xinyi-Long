const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    img_id: String,
    productName: String,
    intro: String,
    price: Number
});

const Product = mongoose.model("Product", productSchema);
module.exports =Product;
