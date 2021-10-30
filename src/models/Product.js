const fs= require('fs');
const path= require('path');

let productListPath = path.join(__dirname, '../../database/products.json');
//let datos = fs.readFileSync (productListPath, 'utf-8'); 


//const product= {
module.exports= {

    // path de acceso a la base de datos
    
    //fileName: './database/products.json',
    fileName: productListPath,


    // muestra todos los productos
    findAll: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    // busca un producto pr id
    findByPK: function(id){
        let products= this.findAll();
        let productFounded= products.find(product=> product.id==id);
        return productFounded;
    },

    // busca un producto por cualquier campo
    findByField: function(field, value){
        let products= this.findAll();
        let productFounded= products.find(product=> product[field]==value);
        return productFounded;
    },

    // devuelve un array con las categorías de producto
    listByField: function (field) {
        let products= this.findAll();
        let listCategories= [];
        for (let i=0; i<products.length; i++){
            if(i==0){
                listCategories.push(products[i][field])
            } else {
                var duplicate= listCategories.find(category=> category==products[i][field]);
                if(!duplicate){ 
                    listCategories.push(products[i][field])
                }
            }
        }
        return listCategories.sort();
    },
    
    // filtro del listado de productos por campo
    findListByField: function (field, value) {
        let products= this.findAll();
        let newArray= products.filter(product=> {
            return product[field]== value;
        })
        return newArray;
    },



    listItemsByCategory: function(){
        let products= this.findAll();
        let aperitivos= products.filter(product=> {
            return product.category=='Aperitivos';
        })
        let cervezas= products.filter(product=> {
            return product.category=='Cervezas';
        })
        let gaseosas= products.filter(product=> {
            return product.category=='Gaseosas';
        })
        let vinos= products.filter(product=> {
            return product.category=='Vinos';
        })
        let whiskeys= products.filter(product=> {
            return product.category=='Whiskeys';
        })
        const object= {
            aperitivos: {
                items: aperitivos.length,
                listItems: aperitivos
            },
            cervezas: {
                items: cervezas.length,
                listItems: cervezas
            },
            gaseosas: {
                items: gaseosas.length,
                listItems: gaseosas
            },
            vinos: {
                items: vinos.length,
                listItems: vinos
            },
            whiskeys: {
                items: whiskeys.length,
                listItems: whiskeys
            }
        }
        return object;
    },





    // creacion de producto
    create: function (object) {
        let products= this.findAll(); 
        let id;
        if(products.length>0){
            id=products.length+1;
        }
        else {
            id= 1;
        }
        let newProduct= {
            id: id,
            ... object
        }
        products.push(newProduct);
        fs.writeFileSync(this.fileName, JSON.stringify(products, null, ' '));
        return newProduct;
    },
    
    // edicion de un producto
    update: function(object){
        let products= this.findAll();
        products.splice(object.id-1, 1, object);
        fs.writeFileSync(this.fileName, JSON.stringify(products, null, ' '));
        return true;
    }
};

//console.log(Product.findListByField("price","400"));
//console.log(Product.listByField('presentation'));
//console.log(Product.findByPK(0));

/* let a= {
    name: "CCC",
    presentation: 999,
    price: 888,
    category: 777,
    stock: 666,
    showing: 000,
    image: "xxx"
  }

console.log(Product.update(11,a)); */

//console.log(product.findAll());
//console.log(product.listItemsByCategory());