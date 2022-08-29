const express = require("express");
const router = require("express").Router();
const Product = require("../model/Product");
const Review = require("../model/Review")
router.post("/productpage", async (req, res) => {
    if (req.cookies.JWT){
        reviewer = req.cookies.user.name
        review = req.body.review.trim()
        rating = req.body.rating
        let full_review = new Review({
            img_id: req.cookies.img_id,
            name: reviewer,
            rating: rating,
            review: review
        })
        await full_review.save();
        res.render("productpage",{
            loggedIn: req.cookies.JWT ? true:false
        })
    }else{
        res.status(400).render('productpage',{
            loggedIn: req.cookies.JWT ? true:false,
        })
    }

})
router.post("/productpage/:id", async (req, res) => {
    img_id = req.body.img_id
    res.status(200).cookie('img_id',img_id)
    res.render("productpage")
})
module.exports = router;