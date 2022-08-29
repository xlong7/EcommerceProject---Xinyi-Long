const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    img_id: String,
    name: String,
    rating: String,
    review: String
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
