const Product= require('../models/Product');

module.exports= {
    index: (req,res)=> { 
        let products= Product.findAll();
        return res.render('index', {products}); 
    },
    detail: (req,res)=> { 
        let product= Product.findByPk(req.params.id);
        console.log(product);
        return res.render('detail', {product}); 
    },
    create: (req,res)=> {
        res.render ('create');
    },
    update: (req,res)=> {
        let product= Product.findByPk(req.params.id);
        res.render ('update', {product: product});
    }
    
    
}