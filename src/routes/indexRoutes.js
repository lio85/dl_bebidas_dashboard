const express = require('express');
const router = express.Router();

const validationLogin= require('./../middlewares/validationLogin');
const refusedLogin= require('./../middlewares/refusedLogin');


const indexController= require('./../controllers/indexController');

router.get('/', refusedLogin, indexController.login);
router.post('/', validationLogin, indexController.processLogin);
router.get('/logout', indexController.logout);

module.exports= router;