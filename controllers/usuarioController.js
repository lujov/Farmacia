const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const {conexion_db} = require('../config/bdConfig');

//configuraciones de passport js
passport.use('local.login',new LocalStrategy({
    usernameField:'mail',
    passwordField:'contrasena',
    passReqToCallback: true
},(req,mail,contrasena,done)=>{
    conexion_db.query('SELECT * FROM t_usuarios WHERE mail = ?',[mail],(err,results)=>{
        if(err) throw err;
        // consegui un usuario
        if(results.length > 0){
            if(results[0].contrasena === contrasena){
                return done(null,results[0]);
            }else{
               return done(null,false,{mensaje:'Contraseña incorrecta o usuario incorrecto'});
            }
        }else{
           return done(null,false,{mensaje:'Usuario no existe'});
        }
    })
}))

passport.use('local.registro',new LocalStrategy({
    usernameField:'mail',
    passwordField:'contrasena',
    passReqToCallback: true
},(req,mail,contrasena,nombre,telefono,direccion,dni,done)=>{
    let newUser = {
        mail,
        contrasena,
        nombre,
        telefono,
        direccion,
        dni
    }
    conexion_db.query('INSERT INTO t_usuarios SET ?',newUser,(err,results)=>{
        if(err)
        throw err;
       newUser.id = results.insertId;
         done(null,newUser);
        // console.log(results);
    })
}))


//serializamos
passport.serializeUser((mail,done)=>{
    done(null,mail.id)
});

// deserializado         
passport.deserializeUser((id,done)=>{
    conexion_db.query('SELECT * FROM t_usuarios WHERE id=?',[id],(err,results)=>{
        done(err,results[0]);
    })
})