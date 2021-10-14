const express = require('express');
const router = express.Router();

const adminLogged= require('../middlewares/adminLogged');

const productController= require('./../controllers/productController');

router.get('/', adminLogged, productController.index);
router.get('/create', adminLogged, productController.create);
router.post('/create', productController.addProduct);
router.get('/update/:id', adminLogged, productController.update);
//router.get('/:id', productController.detail);

module.exports= router;