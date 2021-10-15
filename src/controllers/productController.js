const fs= require('fs');
const Product= require('../models/Product');
const path= require('path');
let {validationResult} = require ('express-validator');

let categories= ['Aperitivos', 'Cervezas', 'Combos', 'Gaseosas', 'Vinos', 'Whiskeys'];
let presentation= ['269 cm3', '473 cm3', '710 cm3', '750 cm3', '1 lt.', '1.5 lts.', '2.25lt.'];

module.exports= {
    index: (req,res)=> { 
        let products= Product.findAll();
        return res.render('index', {products}); 
    },
    create: (req,res)=> {
        res.render ('create', {categories, presentation});
    },
    createProduct: (req,res)=> {
        let errors= validationResult(req)
        if(errors.isEmpty()){
            if(req.files){
                let objectImage= req.files.image;
                let allowed_mimetypes=['image/gif','image/png','image/jpg','image/jpeg','image/bmp','image/webp'];
                let check= allowed_mimetypes.find(element=> element==objectImage.mimetype);
                if (!check){
                    let errors= {image: {msg: "El formato de archivo que intentas subir no es de tipo imagen"}};
                    return res.render ('create', {errors, old: req.body, categories, presentation});
                }
                if(objectImage.size>(1024*200)){
                    let errors= {image: {msg: "El peso del archivo que intentas subir supera el límite permitido"}};
                    return res.render ('create', {errors, old: req.body, categories, presentation});
                }
                let pathDirectoryImages= path.join(__dirname,'../../public/images/products/');
                let nameProduct= Date.now()+'.'+objectImage.mimetype.slice(6);
                objectImage.mv(pathDirectoryImages+nameProduct);
                let newProduct= {
                    ... req.body,
                    image: nameProduct
                }
                Product.create(newProduct)
                return res.redirect('/products');
            }
            else {
                let errors= {image: {msg: "Debes cargar una imagen"}};
                res.render ('create', {errors, old: req.body, categories, presentation});
            }   
        }
        else {
            return res.render ('create', {errors: errors.mapped(), old: req.body, categories, presentation});
        }        
    },
    update: (req,res)=> {
        let product= Product.findByPK(req.params.id);
        product.oppositeStock= product.stock*-1 
        return res.render ('update', {product, categories, presentation});
    },
    updateProduct: (req,res)=> {
        var product= Product.findByPK(req.params.id);
        let errors= validationResult(req)
        if(errors.isEmpty()){
            if(req.files){
                let objectImage= req.files.image;
                let allowed_mimetypes=['image/gif','image/png','image/jpg','image/jpeg','image/bmp','image/webp'];
                let check= allowed_mimetypes.find(element=> element==objectImage.mimetype);
                if (!check){
                    let errors= {image: {msg: "El formato de archivo que intentas subir no es de tipo imagen"}};
                    let  productWithId= {
                        id: product.id,
                        stock: product.stock,
                        oppositeStock: product.stock*-1,
                        image: product.image,
                        ... req.body
                    }
                    return res.render ('update', {errors, product: productWithId, categories, presentation});
                }
                if(objectImage.size>(1024*200)){
                    let errors= {image: {msg: "El peso del archivo que intentas subir supera el límite permitido"}};
                    let  productWithId= {
                        id: product.id,
                        stock: product.stock,
                        oppositeStock: product.stock*-1,
                        image: product.image,
                        ... req.body
                    }
                    return res.render ('update', {errors, product: productWithId, categories, presentation});
                }                
                let pathDirectoryImages= path.join(__dirname,'../../public/images/products/');
                fs.unlinkSync(path.join(pathDirectoryImages+product.image));  
                let nameProduct= Date.now()+'.'+objectImage.mimetype.slice(6);
                objectImage.mv(pathDirectoryImages+nameProduct);
                var stock= Number(product.stock) + Number(req.body.addStock);
                if(stock<0){
                    stock= 0;
                }
                var updatedProduct= {
                    id: product.id,
                    name: req.body.name,
                    presentation: req.body.presentation,
                    price: req.body.price,
                    category: req.body.category,
                    stock: stock,
                    showing: req.body.showing,
                    image: nameProduct
                    }
            } 
            else {
                let stock= Number(product.stock) + Number(req.body.addStock);
                var updatedProduct= {
                    id: product.id,
                    name: req.body.name,
                    presentation: req.body.presentation,
                    price: req.body.price,
                    category: req.body.category,
                    stock: stock,
                    showing: req.body.showing,
                    image: product.image
                }
                
            }
            Product.update(updatedProduct);
            return res.redirect('/products');
        }
        else {
            let  productWithId= {
                id: product.id,
                stock: product.stock,
                oppositeStock: product.stock*-1,
                image: product.image,
                ... req.body
            }
            return res.render ('update', {errors: errors.mapped(), product: productWithId, categories, presentation});
        }       
    }   
}