const express = require('express');
const router = express.Router();

const endpointController= require('./../controllers/endpointController');

router.get('/allproducts', endpointController.allProducts);
router.get('/oneproduct/:id', endpointController.oneProduct);
router.get('/productsbycategory', endpointController.byCategory);
//router.get('/productsbycategory/:category', endpointController.byCategory);
router.get('/prueba', endpointController.prueba);

module.exports= router;