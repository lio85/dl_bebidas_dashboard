const express = require('express');
const router = express.Router();

const productController= require('./../controllers/productController');

router.get('/', productController.index);
router.get('/create', productController.create);
router.get('/addproduct', productController.addProduct);
router.get('/update/:id', productController.update);
//router.get('/:id', productController.detail);

module.exports= router;