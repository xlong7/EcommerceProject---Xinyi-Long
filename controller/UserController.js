const express = require("express");
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Cart = require("../model/Cart");


//Home page
router.get("/", (req, res) => {
  res.render("homepage")
})

//Login
router.get("/login", (req, res) => {
  res.render("login")
})

router.post("/login", async (req, resp) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!await bcrypt.compare(password, user.password))
            throw new Error("Email or password is wrong!");
        const signed_jwt = jwt.sign(req.body, process.env.JWT_KEY);
        resp.cookie('user',user)
        if (name == 'admin'){
          resp.status(200).cookie('JWT',signed_jwt).render('homepage',{
            loggedIn: req.cookies.JWT ? true:false,
            users: user,
            admin:true
          })
        }else{
          resp.status(200).cookie('JWT',signed_jwt).render('homepage',{
            loggedIn: req.cookies.JWT ? true:false,
            users: user,
            admin:false
          })
      }
    } catch (e) {
      // 401: Unauthorized
      console.log(e);
      resp.status(401).send({errorMsg: e.message});
    }
  });


// logout
router.get('/logout',(req,res)=>{
    req.cookies = null
    res.render('homepage')
})

// Register
router.get("/register",(req, res) => {
  res.render("register")
})
router.post("/register", async (req, resp) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, Number(process.env.SALT));
      user = req.body
      let existedName = await User.findOne({"name":req.body.name})
      let existedEmail = await User.findOne({"email":req.body.email})
      if (!existedEmail == null || !existedName == null){
          throw new Error("This email or username is already taken")
      }else if((user.email.indexOf('@') == -1) || (user.email.indexOf('.') == -1)){
        throw new Error("Invalid Email Address")
      }
      else{
        await User.create(req.body);
        let newCart = new Cart({
          username:user.name,
          cart:[],
          total:0,
          amount:0
        })
        await newCart.save();
        resp.status(200).render('login');
      }
    } catch (e) {
      // 400: Bad Request
      console.log(e)
      resp.status(400).send(e);
    }
  });

  module.exports = router;
