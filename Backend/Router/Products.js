const express = require('express');
const { Product } = require('../Controller/product-controller');
const router = express.Router();



router.get('/' , Product)

exports.router = router;
