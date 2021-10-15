const {body} = require('express-validator');

let validationsCreate= [
    body('name')
        .notEmpty().withMessage('Tienes que ingresar un nombre para el producto'),
    body('presentation')
        .notEmpty().withMessage('Tienes que seleccionar la presentación del producto'),
    body('price')
        .isInt({ min: 1}).withMessage('El precio tiene que ser mayor a $0'),
    body('category')
        .notEmpty().withMessage('Tienes que seleccionar la categoría del producto'),
    body('stock')
        .isInt({ min: 0}).withMessage('El stock tiene que ser mayor o igual a cero'),
]

module.exports= validationsCreate;