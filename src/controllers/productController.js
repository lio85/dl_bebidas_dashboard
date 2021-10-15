const fs= require('fs');
const Product= require('../models/Product');
const path= require('path');

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
        let objectImage= req.files.image;
        let allowed_mimetypes=['image/gif','image/png','image/jpg','image/jpeg','image/bmp','image/webp'];
        let check= allowed_mimetypes.find(element=> element==objectImage.mimetype);
        if (!check){
            return res.send("El formato de archivo que intentas subir no es de tipo imagen");
        }
        if(objectImage.size>(1024*200)){
            return res.send("El peso del archivo que intentas subir supera el límite permitido");
        }
        let pathDirectoryImages= path.join(__dirname,'../../public/images/products/');
        let nameProduct= Date.now()+'.'+objectImage.mimetype.slice(6);
        objectImage.mv(pathDirectoryImages+nameProduct);
        let newProduct= {
            ... req.body,
            image: nameProduct
        }
        Product.create(newProduct)
        res.redirect('/products');
    },
    update: (req,res)=> {
        let product= Product.findByPK(req.params.id);
        return res.render ('update', {product, categories, presentation});
    },
    updateProduct: (req,res)=> {
        let product= Product.findByPK(req.params.id);
        if(req.files){
            let objectImage= req.files.image;
            let allowed_mimetypes=['image/gif','image/png','image/jpg','image/jpeg','image/bmp','image/webp'];
            let check= allowed_mimetypes.find(element=> element==objectImage.mimetype);
            if (!check){
                return res.send("El formato de archivo que intentas subir no es de tipo imagen");
            }
            if(objectImage.size>(1024*200)){
                return res.send("El peso del archivo que intentas subir supera el límite permitido");
            }
            let pathDirectoryImages= path.join(__dirname,'../../public/images/products/');
            fs.unlinkSync(path.join(pathDirectoryImages+product.image));  
            let nameProduct= Date.now()+'.'+objectImage.mimetype.slice(6);
            objectImage.mv(pathDirectoryImages+nameProduct);
            let updatedStock= Number(product.stock) + Number(req.body.add_stock);
            var updatedProduct= {
                id: product.id,
                name: req.body.name,
                presentation: req.body.presentation,
                price: req.body.price,
                category: req.body.category,
                stock: updatedStock,
                showing: req.body.showing,
                image: nameProduct
            }
        } 
        else {
            let updatedStock= Number(product.stock) + Number(req.body.add_stock);
            var updatedProduct= {
                id: product.id,
                name: req.body.name,
                presentation: req.body.presentation,
                price: req.body.price,
                category: req.body.category,
                stock: updatedStock,
                showing: req.body.showing,
                image: product.image
            }
        }
        Product.update(updatedProduct);
        return res.redirect('/products');
    }   
}