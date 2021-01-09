const conexion_db = require('../config/bdConfig')

// controladores
const obtenerProducto = (req,res)=>{
    conexion_db.query('SELECT * FROM stock',(err,results)=>{
        if(err)
        throw err;
        // results.forEach((resultado)=>{
        //     console.log(resultado.producto);
        // })
        res.send(results);
        // console.log(results);
    })
    
}


const agregarProductos = (req,res)=>{
    //destructuring
    let {producto,precio} = req.body;
    // console.log(req.body)
    conexion_db.query('INSERT INTO `stock`(`producto`, `precio`) VALUES (?,?)',[producto,precio],(err,results)=>{
        if(err)
        throw err;
        res.send('Datos enviados  con exito!');
        // console.log(results);
    })
}

const editarProducto =(req,res)=>{

    //destructuring
    let {producto} = req.params;

    console.log(producto)
    conexion_db.query('UPDATE `stock` SET `producto`= ? WHERE producto = ?',[req.body.producto,producto],(err,results)=>{
        if(err)
        throw err;
    res.send('Producto editado con exito!');
    })
}

const eliminarProducto = (req,res)=>{
    //destructuring
    let {producto} = req.params;
    console.log(producto)
  
    conexion_db.query('DELETE FROM `stock` WHERE producto = ?',[producto],(err,results)=>{
        if(err)
        throw err;
    res.send('eliminado producto');
    })
}



module.exports = {
    obtenerProducto,
    agregarProductos,
    eliminarProducto,
    editarProducto
}