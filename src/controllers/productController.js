const Product= require('../models/Product');

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
        Product.create(req.query)
        res.redirect ('/');
    },
    update: (req,res)=> {
        let product= Product.findByPk(req.params.id);
        res.render ('update', {product: product});
    }
    
    
}