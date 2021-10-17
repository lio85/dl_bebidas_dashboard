var updateProductForm= document.querySelector('#updateProductForm');

var up_st_rad_btn= document.querySelectorAll('.up_st_rad_btn');
var stock= document.querySelector('#stock');

up_st_rad_btn[0].addEventListener("click", function(){
    stock.removeAttribute("disabled");
})

up_st_rad_btn[1].addEventListener("click", function(){
    stock.removeAttribute("disabled");
})

updateProductForm.addEventListener("submit", function(e){
    e.preventDefault();
    validations();
})

function validations(){
    var errors= false; 
    var name= document.querySelector('#name');
    var price= document.querySelector('#price');
    var image= document.querySelector('#image');

    var name_error= document.querySelector('#name_error');
    var price_error= document.querySelector('#price_error');
    var stock_error= document.querySelector('#stock_error');
    var image_error= document.querySelector('#image_error');

    name_error.textContent="";
    price_error.textContent="";
    stock_error.textContent="";
    image_error.textContent="";

    if(!name.value){
        errors= true;
        name_error.textContent="Tienes que ingresar un nombre para el producto FRONT";
    }
    if(!price.value || isNaN(Number(price.value))){
        errors= true;
        price_error.textContent="El precio tiene que ser un valor numérico mayor a $0 FRONT";
    } else if(Number(price.value)<1){
        errors= true;
        price_error.textContent="El precio tiene que ser mayor a $0 FRONT"; 
    }
    if(!stock.value || isNaN(Number(stock.value))){
        errors= true;
        stock_error.textContent="El stock tiene que ser un valor numérico FRONT";
    }
    if(image.value) {
        let allowed_mimetypes=['image/gif','image/png','image/jpg','image/jpeg','image/bmp','image/webp'];
        let check= allowed_mimetypes.find(element=> image.files[0].type==element);
        if (!check){
            errors= true;
            image_error.textContent="El formato de archivo que intentas subir no es de tipo imagen FRONT";
        } else if (image.files[0].size>(1024*200)){
            errors= true;
            image_error.textContent="El peso/tamaño de la imagen que intentas subir supera el límite permitido FRONT";
        }
    }
    if(!errors){
        updateProductForm.submit();
    }
}