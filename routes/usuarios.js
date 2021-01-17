const express = require('express');
const usuario_controller = require('../controllers/usuarioController');
const usuariosRouter = express.Router();

usuariosRouter.get('/',usuario_controller.obtenerUsuario);

usuariosRouter.post('/usuarios', usuario_controller.registrarUsuario);

usuariosRouter.put('/usuarios/:nombre',usuario_controller.editarNombreUsuario);

usuariosRouter.put('/usuarios/:telefono',usuario_controller.editarTelefonoUsuario);

usuariosRouter.put('/usuarios/:direccion',usuario_controller.editarDireccionUsuario);

usuariosRouter.put('/usuarios/:mail',usuario_controller.editarMailUsuario);

usuariosRouter.put('/usuarios/:dni',usuario_controller.editarDniUsuario);

usuariosRouter.delete('/usuarios/eliminar/:usuario',usuario_controller.eliminarUsuario);

module.exports = usuariosRouter;