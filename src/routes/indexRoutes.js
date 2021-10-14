const express = require('express');
const router = express.Router();

const validationsLogin= require('./../middlewares/validationLogin');

const indexController= require('./../controllers/indexController');

router.get('/', indexController.login);
router.post('/', validationsLogin, indexController.processLogin);

module.exports= router;