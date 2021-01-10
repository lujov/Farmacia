const express = require('express');
const usuario_controller = require('../controllers/usuarioController');
const usuariosRouter = express.Router();

productosRouter.get('/',usuario_controller.obtenerUsuario);

productosRouter.post('/usuarios', usuario_controller.registrarUsuario);

productosRouter.put('/usuarios/:nombre',usuario_controller.editarNombreUsuario);

productosRouter.put('/usuarios/:telefono',usuario_controller.editarTelefonoUsuario);

productosRouter.put('/usuarios/:direccion',usuario_controller.editarDireccionUsuario);

productosRouter.put('/usuarios/:mail',usuario_controller.editarMailUsuario);

productosRouter.put('/usuarios/:dni',usuario_controller.editarDniUsuario);

productosRouter.delete('/usuarios/eliminar/:usuario',usuario_controller.eliminarUsuario);

module.exports = usuariosRouter;