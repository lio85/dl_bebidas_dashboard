const Product= require('../models/Product');

module.exports= {
    allProducts: (req,res)=> {
        let products= Product.findAll();
        return res.json({ 
            quantityProducts: products.length,
            listProducts: products 
        }) 
    },
    oneProduct: (req,res)=> {
        let product= Product.findByPk(req.params.id);
        return res.json({ 
            product: product, 
        }) 
    },
    byCategory: (req,res)=> {
        let products= Product.findByCategory(req.params.category);
        return res.json({ 
            quantityProducts: products.length,
            listProducts: products 
        }) 
    }
    
}