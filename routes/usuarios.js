const express = require('express');
const app = express();
const {isLogin} = require('../middlewares/auth');

//ruta del formulario de registro
app.post('/registro', passport.authenticate('local.registro',{
    successRedirect:'/',
    failureRedirect:'/registro'
}));

//login
app.post('/login',(req,res,next)=>{
passport.authenticate('local.login',(err,user,info)=>{
    if(err){return next(err)}
    if(!user){return res.send(info)}
    req.login(user, function(err) {
        if (err) {return next(err);}
        return res.send('Te has logueado');
      });
})(req,res,next)
})

app.get('/logout',isLogin,(req,res)=>{
req.logOut();
res.send('Cerraste sesion');
})

module.exports = usuariosRouter;