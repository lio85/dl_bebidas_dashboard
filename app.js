const express= require ('express');
const app= express();
const path= require('path');
const session= require('express-session');

const indexRoutes= require('./src/routes/indexRoutes');
const productRoutes= require('./src/routes/productRoutes');
const endpoint= require('./src/routes/endpointRoutes');

app.use(express.static(path.join(__dirname , './public')));
app.use(session({
	secret: 'It is a secret',
	resave: false,
	saveUninitialized: false,
}));


app.set ('view engine', 'ejs');

// configuracion para capturar los datos que vienen desde un formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// configuracion para capturar los datos que vienen desde un formulario

app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/api', endpoint);

app.listen(process.env.PORT || 3070, () => console.log('Servidor corriendo en el puerto 3070'));