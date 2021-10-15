const express = require('express');
const router = express.Router();

const adminLogged= require('../middlewares/adminLogged');
const createFormValidations= require('./../middlewares/createFormValidations');
const updateFormValidations= require('./../middlewares/updateFormValidations');

const productController= require('./../controllers/productController');

router.get('/', adminLogged, productController.index);
router.get('/create', adminLogged, productController.create);
router.post('/create', createFormValidations, productController.createProduct);
router.get('/update/:id', adminLogged, productController.update);
router.put('/update/:id', updateFormValidations, productController.updateProduct);
//router.get('/:id', productController.detail);

module.exports= router;