const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

//consulta a la base de datos para inicio de sesion y mensajes de aleta
passport.use('local.iniciosesion', new LocalStrategy({
  usernameField: 'mail', //desde que campo tomo el nombre de usuario
  passwordField: 'contrasena', //desde que campo tomo la contrasena
  passReqToCallback: true
}, async (req, mail, contrasena, done) => {
  const rows = await pool.query('SELECT * FROM t_usuarios WHERE mail = ?', [mail]);
  
  //validaciones de usuario y contrasena
  if (rows.length > 0) {
    const usuario = rows[0];
    const contrasenaValida = await helpers.matchPassword(contrasena, usuario.contrasena);
    if (contrasenaValida) {
      done(null, usuario, req.flash('success', 'Bienvenido/a ' + usuario.nombre));
    } 
    else {
      done(null, false, req.flash('message', 'Usuario y/o contraseña incorrectos'));
    }
  } else {
    return done(null, false, req.flash('message', 'Usuario y/o contraseña incorrectos'));
  }
}));

// ingreso de datos de registro del usuario en la base de datos
passport.use('local.registro', new LocalStrategy({
  usernameField: 'mail',
  passwordField: 'contrasena',
  passReqToCallback: true
}, async (req, mail, contrasena, done) => {
    const { nombre, telefono, direccion, dni } = req.body;
    let usuarioNuevo = {
      mail, 
      contrasena,
      nombre,
      telefono,
      direccion,
      dni
    };

    usuarioNuevo.contrasena = await helpers.encryptPassword(contrasena);

    // guardo el nuevo usuario en la base de datos
    const resultado = await pool.query('INSERT INTO t_usuarios SET ? ', usuarioNuevo);
    usuarioNuevo.id_usuario = resultado.insertId;
    req.flash('success', 'Registro exitoso. Bienvenido/a ' + usuario.nombre)
    return done(null, usuarioNuevo);
    }));

// serializacion del usuario
passport.serializeUser((user, done) => {
    done(null, user.id_usuario);
});

// desserializacion del usuario
passport.deserializeUser(async (id_usuario, done) => {
  const rows = await pool.query('SELECT * FROM t_usuarios WHERE id_usuario = ?', [id_usuario]);
  done(null, rows[0]);
});