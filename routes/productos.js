const express = require('express');
const producto_controller = require('../controllers/productoController');
const productosRouter = express.Router();

productosRouter.get('/',producto_controller.obtenerProducto);

productosRouter.post('/productos', producto_controller.agregarProductos);

productosRouter.put('/productos/:producto',producto_controller.editarProducto);

productosRouter.delete('/productos/:producto',producto_controller.eliminarProducto);

module.exports = productosRouter;