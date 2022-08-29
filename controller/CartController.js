const router = require("express").Router();
const Cart = require("../model/Cart");
const Order = require("../model/Order");
const Product = require("../model/Product");

// This page includes the post method for both cart page and checkout page
router.post('/cartpage/:id',async (req,res)=>{
    if (req.cookies.user){
        const user = req.cookies.user
        const img_id = req.cookies.img_id
        let product = await Product.findOne({img_id:img_id})
        let userCart = await Cart.findOne({username:user.name})
        let cart = userCart.cart
        let difItem = true
        for (item of cart){
            if(product.img_id == item.img_id){
                difItem = false
                item.amount += 1
            }
        }
        
        if (difItem){
            cart.push({
                img_id:product.img_id,
                productName:product.productName,
                intro: product.intro,
                price:product.price,
                amount: 1
            })
        }else{
            await Cart.updateOne({username:user.name},{
                username: user.name,
                cart: cart,
                total: user.total
            })
        }
        userCart.total += product.price
        console.log(userCart)
        await userCart.save();
        res.render("cartpage")
    }else{
        res.render('cartpage',{
            loggedIn:req.cookies.JWT ? true:false,
          })
    }
})

router.post('/checkout',async (req,res)=>{
    let order = req.body
    
    const username = req.cookies.user.name
    const cartinfo = await Cart.find({username:username})
    order.products = []
    for (item of cartinfo.at(0).cart){
        order.products.push(item.productName)
    }
    order.total = cartinfo.at(0).total
    const date = new Date().toLocaleDateString('en-US')
    order.username = username
    order.time = date
    order.status = 'Pending'
    await Order.create(order);
    await Cart.findOneAndReplace({username:username},{
        username:username,
        cart:[],
        total:0,
        amount:0
       })
    res.status(200).render('myorder')
})

module.exports = router;