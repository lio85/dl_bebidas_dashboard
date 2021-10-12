const express= require ('express');
const app= express();
// const path= require('path');
const productRoutes= require('./src/routes/productRoutes');
const endpoint= require('./src/routes/endpointRoutes');

app.set ('view engine', 'ejs');

app.use('/', productRoutes);
app.use('/api', endpoint);

app.listen(process.env.PORT || 3070, () => console.log('Servidor corriendo en el puerto 3070'));