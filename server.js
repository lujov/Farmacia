const express = require('express');
const cors = require('cors');
const productosRouter = require('./routes/productos');
const usuariosRouter = require('./routes/usuarios');
const {options} = require('./config/bdConfig');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const {isLogin} = require('./middlewares/auth');
// const usuariosRouter = require('./routes/usuarios');

// INICIALIZADORES
const app = express();
require('./controllers/usuarioController');
const sessionStore = new MySQLStore(options);

// JSON
app.use(cors());
app.use(express.json()); // permite que mi app acepte json del lado del cliente
app.use(express.urlencoded({extended:true})); // permite interprete los datos que vienen del cliente

// PRODUCTOS
app.use('/gestorproductos',productosRouter);
app.use('/gestorusuarios',usuariosRouter);

// USUARIOS
//middlewares
app.use(session({
    secret: 'este es es un secreto que no se lo podes contar a nadie en tu vida',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
    
}))
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

// PUERTO
app.listen(3306,()=>{
    console.log('escuchando en el puerto 3306');
});