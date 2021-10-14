const fs= require('fs');
const bcrypt= require('bcryptjs');

let User= {
    fileName: './database/users.json',
    findAll: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    findByPK: function(id){
        let users= this.findAll();
        let userFounded= users.find(user=> user.id==id);
        return userFounded;
    },
    findByField: function(field, value){
        let products= this.findAll();
        let productFounded= products.find(product=> product[field]==value);
        return productFounded;
    },
    create: function(user) {
        let users= this.findAll();
        let id;
        if(users.length>0){
            id=users.length+1;
        }
        else {
            id= 1;
        }
        let hashed_password= bcrypt.hashSync(user.password,10);
        let newUser= {
            id: id,
            user: user.user,
            password: hashed_password
        }
        users.push(newUser);
        fs.writeFileSync('./database/users.json', JSON.stringify(users, null, ' '));
        return users;
    }
}

//User.create({user: "admin1@dl-bebidas.com", password: "dl-bebidas"});

module.exports= User;

