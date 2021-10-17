var createProductForm= document.querySelector('#createProductForm');

createProductForm.addEventListener("submit", function(e){
    e.preventDefault();
    validations();
})

function validations(){
    var errors= false; 
    var name= document.querySelector('#name');
    var presentation= document.querySelector('#presentation');
    var price= document.querySelector('#price');
    var category= document.querySelector('#category');
    var stock= document.querySelector('#stock');
    var image= document.querySelector('#image');

    var name_error= document.querySelector('#name_error');
    var presentation_error= document.querySelector('#presentation_error');
    var price_error= document.querySelector('#price_error');
    var category_error= document.querySelector('#category_error');
    var stock_error= document.querySelector('#stock_error');
    var image_error= document.querySelector('#image_error');

    name_error.textContent=""
    presentation_error.textContent=""
    price_error.textContent=""
    category_error.textContent=""
    stock_error.textContent=""
    image_error.textContent=""

    if(!name.value){
        errors= true;
        name_error.textContent="Tienes que ingresar un nombre para el producto";
    }
    if(!presentation.value){
        errors= true;
        presentation_error.textContent="Tienes que seleccionar la presentación del producto";
    }
    if(!price.value || isNaN(Number(price.value))){
        errors= true;
        price_error.textContent="El precio tiene que ser un valor numérico mayor a $0";
    } else if(Number(price.value)<1){
        errors= true;
        price_error.textContent="El precio tiene que ser mayor a $0"; 
    }
    if(!category.value){
        errors= true;
        category_error.textContent="Tienes que seleccionar la categoría del producto";
    }
    if(!stock.value || isNaN(Number(stock.value))){
        errors= true;
        stock_error.textContent="El stock tiene que ser un valor numérico mayor 0";
    } else if(Number(stock.value)<0){
        errors= true;
        stock_error.textContent="El stock tiene que ser mayor a 0"; 
    }

    if(!image.value){
        errors= true;
        image_error.textContent="Tienes que seleccionar una imagen";
    } else {
        let allowed_mimetypes=['image/gif','image/png','image/jpg','image/jpeg','image/bmp','image/webp'];
        let check= allowed_mimetypes.find(element=> image.files[0].type==element);
        if (!check){
            errors= true;
            image_error.textContent="El formato de archivo que intentas subir no es de tipo imagen";
        } else if (image.files[0].size>(1024*200)){
            errors= true;
            image_error.textContent="El peso/tamaño de la imagen que intentas subir supera el límite permitido";
        }
    }
    if(!errors){
        createProductForm.submit();
    }
}