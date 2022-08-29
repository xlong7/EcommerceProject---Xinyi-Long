const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
   username: String,
   cart: Array,
   total: Number,
});

const Cart= mongoose.model("Cart", cartSchema);
module.exports =Cart;