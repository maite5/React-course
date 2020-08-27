process.env.BASE_URL   = 'http://localhost:8888/';
process.env.IMAGES_URL = process.env.BASE_URL + 'images/';

const express = require('express');
const cors    = require('cors'); 
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const productosRoutes = require('./routes/productos_routes');
const sessionRoutes   = require('./routes/session_routes'); 
const favoritosRoutes = require('./routes/favoritos_routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false} ));
app.use(bodyParser.json());
app.use(fileUpload());

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const auth = require('./auth');

app.use(express.static('../public'));

app.use( cors({
                credentials: true,
                origin: 'http://localhost:3000',
                allowedHeaders: ['Content-Type']
})
)

app.use( session({
    store  : new FileStore,
    secret : '123456',
    resave: false,
    saveUninitialized: true,
    name: 'cloneml'
}))

app.use('/auth', sessionRoutes);
app.use('/productos', productosRoutes);
app.use('/favoritos', favoritosRoutes);

app.listen(8888, ()=>{ console.log('Escuchando....')} );