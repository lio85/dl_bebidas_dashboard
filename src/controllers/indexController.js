const User= require('../models/User');
let {validationResult} = require ('express-validator');
const bcrypt= require('bcryptjs');

module.exports= {
    login: (req,res)=> {
        return res.render('login');
    }/* ,
    processRegister: (req,res)=> {
        
    } */,
    processLogin: (req,res)=> {
        let errors= validationResult(req)
        if(errors.isEmpty()){
            let user= User.findByField('user', req.body.user)
            if (user){
                let check= bcrypt.compareSync(req.body.password, user.password)
                if(check){
                    delete user.id;
                    delete user.password;
                    req.session.userLogged= true;
                    return res.redirect('/products');
                }
                else {
                    return res.render('login', {invalidCredentials: "Credenciales inválidas"});
                }
            }
            else {
                return res.render('login', {invalidCredentials: "Credenciales inválidas"});
            }
        }
        return res.render('login', {errors: errors.mapped(), old: req.body});
    },
    logout: (req,res)=> {
        req.session.destroy();
        res.redirect('/')
    }
}