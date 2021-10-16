var loginForm= document.querySelector('#loginForm');

loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    validations();
})

function validations(){
    var errors= false; 
    var user= document.querySelector('#user');
    var password= document.querySelector('#password');

    var user_error= document.querySelector('#user_error');
    var password_error= document.querySelector('#password_error');

    user_error.textContent=""
    password_error.textContent=""

    if(!user.value){
        errors= true;
        user_error.textContent="Debes completar este campo";
    }
    else if(!user.value.includes("@") || !user.value.includes(".")) {
        errors= true;
        user_error.textContent="Debes ingresar un email válido";
    }
    if(!password.value){
        errors= true;
        password_error.textContent="Debes completar este campo";
    }
    if(!errors){
        loginForm.submit();
    }
}
    


