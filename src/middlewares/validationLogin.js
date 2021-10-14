const {body} = require('express-validator');

let validationsLogin= [
    body('user')
        .notEmpty().withMessage('Debes completar este campo').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('Debes completar este campo')
]

module.exports= validationsLogin;