const express = require('express');
const app = express();
const cors = require('cors');
const productosRouter = require('./routes/productos');
const usuariosRouter = require('./routes/usuarios');

app.use(cors());
app.use(express.json()); // permite que mi app acepte json del lado del cliente
app.use(express.urlencoded({extended:true})); // permite interprete los datos que vienen del cliente

app.use('/gestorproductos',productosRouter);
app.use('/gestorusuarios',usuariosRouter);

app.listen(3306,()=>{
    console.log('escuchando en el puerto 3306');
});