const router = require("express").Router();
const Order = require("../model/Order");
const User = require("../model/User");


router.post("/admin_checkout", async (req, res) => {
    const order_id = req.body.order_id
    let newStatus = req.body.approval
    let order = await Order.find({_id:order_id})
    order.at(0).status = newStatus
    order.at(0).save();
    res.status(200).render('homepage')
})
router.post("/order_history",async(req,res)=>{
   
    res.status(200).render('order_history')
})
router.get("/order_history",async(req,res)=>{
    const users = await User.find()
    // var orders;
    var order_history = {}
    for (let user of users){
        if(user.name != 'admin'){
            let orders = await Order.find({username: user.name})
            order_history[user.name]= []
            if(orders.length != 0){
                for(order of orders){
                    order_history[user.name].push({
                        order_id: order._id,
                        time: order.time,
                        payment: order.payment,
                        billing:order.billing,
                        shipping:order.shipping,
                    })
                }
                order_history[user.name].haveOrders = true
            }else{
                order_history[user.name].haveOrders = false
            }
        }  
    }
    console.log(order_history)
    res.status(200).render('order_history',{
        order_history,
        loggedIn:req.cookies.JWT ? true:false,
    })
})
module.exports = router;