const express = require('express');
const router = express.Router();

const endpointController= require('./../controllers/endpointController');

router.get('/allproducts', endpointController.allProducts);
router.get('/oneProduct/:id', endpointController.oneProduct);
router.get('/productsbycategory/:category', endpointController.byCategory);

module.exports= router;