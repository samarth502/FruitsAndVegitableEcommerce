const express = require('express');


const {authMiddleware} = require('../middleware/auth-MiddelWare.js'); 
const{ addToCart, clearCart, decreaseProudctQty, removeProductFromCart, userCart }  =require( '../Controller/cart-Controller.js') 

const router = express.Router();

// add To cart
router.post('/add',authMiddleware,addToCart)

// get User Cart
router.get("/user", authMiddleware, userCart);

// remove product from cart
router.delete("/remove/:productId", authMiddleware, removeProductFromCart);

// clear cart
router.delete("/clear", authMiddleware, clearCart);

// decrease items qty
router.post("/--qty", authMiddleware, decreaseProudctQty);


exports.router = router;
