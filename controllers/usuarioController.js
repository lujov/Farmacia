const conexion_db = require('../config/bdConfig')

// CONTROLADORES
const obtenerUsuario = (req,res)=>{
    conexion_db.query('SELECT * FROM t_usuarios',(err,results)=>{
        if(err)
        throw err;
        res.send(results);
    });
}

const registrarUsuario = (req,res)=>{
    //destructuring
    let {id_usuario,nombre,telefono,direccion,mail,dni} = req.body;
    // console.log(req.body)
    conexion_db.query('INSERT INTO `t_usuarios`(`id_usuario`,`nombre`, `telefono`,`direccion`,`mail`,`dni`) VALUES (?,?)',[id_usuario,nombre,telefono,direccion,mail,dni],(err,results)=>{
        if(err)
        throw err;
        res.send('Datos enviados con exito!');
    })
}

const editarNombreUsuario =(req,res)=>{

    //destructuring
    let {nombre} = req.params;

    conexion_db.query('UPDATE `t_usuarios` SET `nombre`= ? WHERE nombre = ?',[req.body.nombre,nombre],(err,results)=>{
        if(err)
        throw err;
    res.send('Nombre de usuario editado con exito!');
    })
}

const editarTelefonoUsuario =(req,res)=>{

    //destructuring
    let {telefono} = req.params;

    conexion_db.query('UPDATE `t_usuarios` SET `telefono`= ? WHERE telefono = ?',[req.body.telefono,telefono],(err,results)=>{
        if(err)
        throw err;
    res.send('Telefono de usuario editado con exito!');
    })
}

const editarDireccionUsuario =(req,res)=>{

    //destructuring
    let {direccion} = req.params;

    conexion_db.query('UPDATE `t_usuarios` SET `direccion`= ? WHERE direccion = ?',[req.body.direccion,direccion],(err,results)=>{
        if(err)
        throw err;
    res.send('Direccion de usuario editado con exito!');
    })
}

const editarMailUsuario =(req,res)=>{

    //destructuring
    let {mail} = req.params;

    conexion_db.query('UPDATE `t_usuarios` SET `mail`= ? WHERE mail = ?',[req.body.mail,mail],(err,results)=>{
        if(err)
        throw err;
    res.send('Mail de usuario editado con exito!');
    })
}

const editarDniUsuario =(req,res)=>{

    //destructuring
    let {dni} = req.params;

    conexion_db.query('UPDATE `t_usuarios` SET `dni`= ? WHERE dni = ?',[req.body.dni,dni],(err,results)=>{
        if(err)
        throw err;
    res.send('Dni de usuario editado con exito!');
    })
}

const eliminarUsuario = (req,res)=>{
    //destructuring
    let {id_usuario} = req.params;
  
    conexion_db.query('DELETE FROM `t_usuarios` WHERE id_usuario = ?',[id_usuario],(err,results)=>{
        if(err)
        throw err;
    res.send('Usuario eliminado con exito!');
    })
}

module.exports = {
    obtenerUsuario,
    registrarUsuario,
    eliminarUsuario,
    editarNombreUsuario,
    editarTelefonoUsuario,
    editarDireccionUsuario,
    editarMailUsuario,
    editarDniUsuario
}