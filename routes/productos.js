const express = require('express');
const producto_controller = require('../controllers/productoController');
const productosRouter = express.Router();

productosRouter.get('/',producto_controller.obtenerProducto);

productosRouter.post('/productos',producto_controller.agregarProductos);

productosRouter.put('/productos/:nombre',producto_controller.editarNombreProducto);

productosRouter.put('/productos/:precio',producto_controller.editarPrecioProducto);

productosRouter.put('/productos/:categoria',producto_controller.editarCategoriaProducto);

productosRouter.put('/productos/:id',producto_controller.editarIdProducto);

productosRouter.put('/productos/:id',producto_controller.editarStockProducto);

productosRouter.delete('/productos/eliminar/:producto',producto_controller.eliminarProducto);

module.exports = productosRouter;