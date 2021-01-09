const conexion_db = require('../config/bdConfig')

// CONTROLADORES
const obtenerProducto = (req,res)=>{
    conexion_db.query('SELECT * FROM t_productos',(err,results)=>{
        if(err)
        throw err;
        res.send(results);
    });
}

const agregarProductos = (req,res)=>{
    //destructuring
    let {id_producto,nombre,precio,categoria} = req.body;
    // console.log(req.body)
    conexion_db.query('INSERT INTO `t_productos`(`id_producto`,`nombre`, `precio`,`categoria`) VALUES (?,?)',[id_producto,nombre,precio,categoria],(err,results)=>{
        if(err)
        throw err;
        res.send('Datos enviados con exito!');
    })
}

const editarNombreProducto =(req,res)=>{

    //destructuring
    let {nombre} = req.params;

    conexion_db.query('UPDATE `t_productos` SET `nombre`= ? WHERE nombre = ?',[req.body.nombre,nombre],(err,results)=>{
        if(err)
        throw err;
    res.send('Nombre de producto editado con exito!');
    })
}

const editarPrecioProducto =(req,res)=>{

    //destructuring
    let {precio} = req.params;

    conexion_db.query('UPDATE `t_productos` SET `precio`= ? WHERE precio = ?',[req.body.precio,precio],(err,results)=>{
        if(err)
        throw err;
    res.send('Precio de producto editado con exito!');
    })
}

const editarCategoriaProducto =(req,res)=>{

    //destructuring
    let {categoria} = req.params;

    conexion_db.query('UPDATE `t_productos` SET `categoria`= ? WHERE categoria = ?',[req.body.categoria,categoria],(err,results)=>{
        if(err)
        throw err;
    res.send('Categoria de producto editado con exito!');
    })
}

const editarIdProducto =(req,res)=>{

    //destructuring
    let {id_producto} = req.params;

    conexion_db.query('UPDATE `t_productos` SET `id_producto`= ? WHERE id_producto = ?',[req.body.id_producto,id_producto],(err,results)=>{
        if(err)
        throw err;
    res.send('Id de producto editado con exito!');
    })
}

const eliminarProducto = (req,res)=>{
    //destructuring
    let {id_producto} = req.params;
  
    conexion_db.query('DELETE FROM `t_productos` WHERE id_producto = ?',[id_producto],(err,results)=>{
        if(err)
        throw err;
    res.send('Producto eliminado con exito!');
    })
}

module.exports = {
    obtenerProducto,
    agregarProductos,
    eliminarProducto,
    editarNombreProducto,
    editarPrecioProducto,
    editarCategoriaProducto,
    editarIdProducto
}