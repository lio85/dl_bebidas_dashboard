const express = require('express');
const router = express.Router();

const adminLogged= require('../middlewares/adminLogged');
const validationCreate= require('./../middlewares/validationCreate');

const productController= require('./../controllers/productController');

router.get('/', adminLogged, productController.index);
router.get('/create', adminLogged, productController.create);
router.post('/create', validationCreate, productController.createProduct);
router.get('/update/:id', adminLogged, productController.update);
router.put('/update/:id', productController.updateProduct);
//router.get('/:id', productController.detail);

module.exports= router;