const {body} = require('express-validator');

let updateFormValidations= [
    body('name')
        .notEmpty().withMessage('Tienes que ingresar un nombre para el producto'),
    body('price')
        .isInt().withMessage('El precio tiene que ser un valor numérico').bail()
        .isInt({ min: 1}).withMessage('El precio tiene que ser mayor a $0'),
    /* body('addStock')
        .isInt().withMessage('El stock tiene que ser un valor numérico'), */
]

module.exports= updateFormValidations;