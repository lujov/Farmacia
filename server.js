const express = require('express');
const morgan = require ('morgan');
const exphbs = require ('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./keys');
const passport = require('passport');
const PORT = process.env.PORT || 3306;
// const {isLogin} = require('./middlewares/auth');
// const usuariosRouter = require('./routes/usuarios');

// INICIALIZADORES
const app = express();
require('./lib/passport');

// SETTINGS
app.set('port',process.env.PORT || 3306);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main', // html base
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'), // sirve para agregar fragmentos de codigo a distintas partes de la pagina
  extname: '.hbs', 
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// MIDDLEWARES
app.use(flash());
app.use(morgan('dev'));
app.use(express.json()); // permite que mi app acepte json del lado del cliente
app.use(express.urlencoded({extended:true})); // permite interprete los datos que vienen del cliente
app.use(session({
    secret: 'este es es un secreto que no se lo podes contar a nadie en tu vida',
    resave: false, //sirve para que no se renueve la sesion
    saveUninitialized: true, //para que no se vueva a establecer la sesion
    store: new MySQLStore(database) //donde guardo la sesion
}));
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL VARIABLES
app.use((req, res, next) => {
  app.locals.message = req.flash('message'); 
  app.locals.success = req.flash('success'); // mensaje de accion completada
  app.locals.user = req.user; //la variable user puede ser usada en cualquier vista
  next();
});

// RUTAS
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/tienda', require('./routes/tienda'));

// ACCESO PUBLICO

// PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

// PUERTO
app.listen(PORT,()=>{
  console.log('Servidor corriendo en puerto ${PORT}');
});

// app.listen(app.get('port'),()=>{
//     console.log('escuchando en el puerto 3306');
// });