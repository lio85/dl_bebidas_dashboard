const Product= require('../models/Product');

module.exports= {
    allProducts: (req,res)=> {
        let products= Product.findAll();
        //image_product: "https://mameli.herokuapp.com/imagenes/productImages/" + products[i].image_product,
        for (let i=0; i<products.length;i++){
            products[i].image= "https://dl-bebidas-dashboard.herokuapp.com/images/products/"+products[i].image;
        }

        return res.json({ 
            quantityProducts: products.length,
            listProducts: products 
        }) 
    },
    oneProduct: (req,res)=> {
        let product= Product.findByPK(req.params.id);
        return res.json({ 
            product: product, 
        }) 
    },

    byCategory: (req,res)=> {
        let object= Product.listItemsByCategory();
        for (item of object.aperitivos.listItems){
            item.image= `https://dl-bebidas-dashboard.herokuapp.com/images/products/${item.image}`
        }
        for (item of object.cervezas.listItems){
            item.image= `https://dl-bebidas-dashboard.herokuapp.com/images/products/${item.image}`
        }
        for (item of object.gaseosas.listItems){
            item.image= `https://dl-bebidas-dashboard.herokuapp.com/images/products/${item.image}`
        }
        for (item of object.vinos.listItems){
            item.image= `https://dl-bebidas-dashboard.herokuapp.com/images/products/${item.image}`
        }
        for (item of object.whiskeys.listItems){
            item.image= `https://dl-bebidas-dashboard.herokuapp.com/images/products/${item.image}`
        }
        return res.json(object); 



    }


    
}