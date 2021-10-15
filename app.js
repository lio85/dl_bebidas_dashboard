const express= require ('express');
const app= express();
const path= require('path');
const session= require('express-session');
const expressFileUpload= require('express-fileupload');
var cors = require('cors')
var methodOverride = require('method-override')

const indexRoutes= require('./src/routes/indexRoutes');
const productRoutes= require('./src/routes/productRoutes');
const endpoint= require('./src/routes/endpointRoutes');

app.use(cors())

app.use(session({
	secret: 'It is a secret',
	resave: false,
	saveUninitialized: false,
}));

app.use(methodOverride('_method'))

app.listen(process.env.PORT || 3070, () => console.log('Servidor corriendo en el puerto 3070'));

app.use(expressFileUpload());

// configuracion para capturar los datos que vienen desde un formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// configuracion para capturar los datos que vienen desde un formulario


app.use(express.static(path.join(__dirname , './public')));



/* app.get('/foto', (req,res)=>{
	res.send(`
		<form action="/foto" method="post" enctype="multipart/form-data">
    		<input type="file" name="foto" required>
    		<input type="submit" value="Subir foto">
		</form>
	`)
})

app.post('/foto', (req,res)=>{
	let objectImage= req.files.foto;
	let allowed_mimetypes=['image/gif','image/png','image/jpg','image/jpeg','image/bmp','image/webp'];
	let check= allowed_mimetypes.find(element=> element==objectImage.mimetype);
	if (!check){
		return res.send("El formato de archivo que intentas subir no es de tipo imagen");
	}
	if(objectImage.size>(1024*25)){
		return res.send("El peso del archivo que intentas subir supera el límite permitido");
	}
	objectImage.mv(__dirname+'/public/images/products/'+objectImage.name)
	console.log(req.files);
	return res.send("Se subió la imagen");
}) */
app.set ('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/api', endpoint);



