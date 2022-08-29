const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   username: String,
   name:String,
   email:String,
   billing: String,
   shipping:String,
   payment: String,
   time: Date,
   status:String,
   products: Array,
   total: Number
   
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;