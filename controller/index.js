const router = require('express').Router();

const ItemRouter = require("./ItemController");
const UserRouter = require("./UserController");
const ProductController = require("./ProductController")
const CartController = require("./CartController")
const AdminController = require("./AdminController")

router.use(UserRouter);
router.use(ItemRouter);
router.use(ProductController)
router.use(CartController)
router.use(AdminController)


module.exports = router;
