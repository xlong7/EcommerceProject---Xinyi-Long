const router = require("express").Router();
const {auth_jwt} = require("../middleware/auth");
const Order = require("../model/Order");
const Cart = require("../model/Cart");
const Review = require("../model/Review")
const Product = require("../model/Product")
const jwt = require("jsonwebtoken");

router.get("/homepage", async (req, res) => {
  var username;
  if (req.cookies.JWT){
    jwt.verify(req.cookies.JWT, process.env.JWT_KEY,(err, decoded)=>{
      if(err){
        res.status(401).send({redirect:"/homepage"})
      }
      username = decoded.name
    })
    var orders;
    var accepted;
    if (username =='admin'){
      orders = await Order.find({status:"Pending"})
      accepted =  await Order.find({status:"accepted"})
      rejected = await Order.find({status:"rejected"})
      res.render("homepage",{
        loggedIn:req.cookies.JWT ? true:false,
        username:username,
        admin: username=='admin',
        orders:orders,
        accepted:accepted,
        rejected:rejected
      });
    }else{
      res.render("homepage",{
        loggedIn:req.cookies.JWT ? true:false,
        username:username,
        });
      }
  }else{
    res.render("homepage",{
      loggedIn:req.cookies.JWT ? true:false,
      username: undefined,
    });
  }
  
  
});
router.get("/productpage",async (req,res)=>{
  img_id = req.cookies.img_id
  const info = await Product.find({img_id:img_id})

  let product = {
    img_id: info.at(0).img_id,
    productName: info.at(0).productName,
    intro: info.at(0).intro,
    price: info.at(0).price,
  }
  let reviews = await Review.find({img_id:img_id})
  product.reviews = reviews
  product.brand = img_id.at(0)
  product.loggedIn = req.cookies.JWT ? true:false,
  res.render('productpage',product)
})

router.get("/cartpage",auth_jwt,async (req,res)=>{
  if (req.cookies.user){
    username = req.cookies.user.name
    cartinfo = await Cart.find({username:username})
    for(items of cartinfo.at(0).cart){
      items.brand = items.img_id.at(0)
    }
    // Round the total price to two decimals 
    cartinfo.at(0).total = Math.round(cartinfo.at(0).total* 100) / 100
    
    res.render('cartpage',{
      loggedIn:req.cookies.JWT ? true:false,
      cartinfo: cartinfo,
      // brand: img_id.at(0)
    })
  }else{
    res.render('cartpage',{
      loggedIn:req.cookies.JWT ? true:false,
    })
  }

})

router.get("/checkout",auth_jwt,(req,res)=>{
  res.render('checkout')
})

router.get("/myorder",auth_jwt,async (req,res)=>{
  if(req.cookies.user){
    const username = req.cookies.user.name
    let orders = await Order.find({username:username})
    for (order of orders){
      order.time = order.time.toLocaleDateString('en-US')
    }
    
    res.render('myorder',{
      loggedIn: req.cookies.JWT ?true:false,
      orders:orders
    })
  }else{
    res.render('myorder',{
      loggedIn:req.cookies.JWT ? true:false,
      orders:undefined
    })
  }
})


router.get("/admin",auth_jwt,async (req,res)=>{
  username = req.cookies.user.name
  let requests = await Order.find({status:"Pending"})
})

module.exports = router;