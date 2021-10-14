const Product= require('../models/Product');
const path= require('path');

module.exports= {
    index: (req,res)=> { 
        let products= Product.findAll();
        
        return res.render('index', {products}); 
    },
    /* detail: (req,res)=> { 
        let product= Product.findByPk(req.params.id);
        console.log(product);
        return res.render('detail', {product}); 
    }, */
    create: (req,res)=> {
        let categories= ['Aperitivos', 'Cervezas', 'Combos', 'Gaseosas', 'Vinos', 'Whiskeys'];
        let presentation= ['269 cm3', '473 cm3', '710 cm3', '750 cm3', '1 lt.', '1.5 lts.', '2.25lt.'];

        res.render ('create', {categories, presentation});
    },
    addProduct: (req,res)=> {
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
        let product= Product.findByPk(req.params.id);
        res.render ('update', {product: product});
    }
    
    
}