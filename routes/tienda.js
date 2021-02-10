// --- SECCION PARA CREAR ENLACES ---
const express = require('express');
const router = express.Router();
const { usuarioLogueado, usuarioNoLogueado, usuarioAdmin } = require('../lib/auth');

// conexion con base de datos
const pool = require('../database');

// ruta para acceder a la tienda
router.get('/', async (req, res) => {
    const tienda = await pool.query('SELECT * FROM t_productos');
    res.render('tienda/tienda', { tienda });
});

// ruta para agregar productos a la base de datos
router.get('/agregarproducto',usuarioAdmin,(req,res) => {
    res.render('tienda/agregarproducto');
});

router.post('/agregarproducto', async (req, res) => {
    const { nombre, precio, categoria, stock} = req.body;
    const productoNuevo = {
        nombre,
        precio,
        categoria,
        stock
    };
    await pool.query('INSERT INTO t_productos set ?', [productoNuevo]);
    req.flash('success','Producto guardado correctamente');
    res.redirect('/tienda'); // una vez subido el producto te redirecciona a esta ruta
});

// ruta para eliminar productos
router.get('/eliminar/:id',usuarioAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM t_productos WHERE ID = ?', [id]);
    req.flash('success','Producto eliminado con exito');
    res.redirect('/tienda'); 
});

// ruta para ver el producto a editar
router.get('/editar/:id',usuarioAdmin, async (req, res) => {
    const { id } = req.params;
    const tienda = await pool.query('SELECT * FROM t_productos WHERE id = ?', [id]);
    res.render('tienda/editarproducto', {tienda: tienda[0]});
});

// ruta para editar productos
router.post('/editarproducto/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, categoria, stock} = req.body; 
    const productoNuevo = {
        nombre,
        precio,
        categoria,
        stock
    };
    await pool.query('UPDATE t_productos set ? WHERE id = ?', [productoNuevo, id]);
    req.flash('success','Producto editado con exito');
    res.redirect('/tienda');
});

//ruta para acceder al carrito
router.get('/carrito', usuarioLogueado, async (req, res) => {
    const carrito = await pool.query('SELECT * FROM t_carrito WHERE user_id = ?', [req.user.id_usuario]);
    let total = 0;
    for (let index = 0; index < carrito.length; index++) {
        total = total + (carrito[index].cantidad*carrito[index].precio);
    }
    res.render('tienda/carrito', { carrito,total });
});

//agregar producto al carrito
router.post('/agregarcarrito',usuarioLogueado, async (req, res) => {
    const {nombre, precio,cantidad} = req.body;
    const productoCarrito = {
        nombre,
        precio,
        cantidad,
        user_id: req.user.id_usuario
    };
    await pool.query('INSERT INTO t_carrito set ?', [productoCarrito]);
    req.flash('success','Producto guardado correctamente');
    res.redirect('/tienda');
});

//eliminar producto del carrito
router.get('/eliminarcarrito/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM t_carrito WHERE id = ?', [id]);
    req.flash('success','Producto eliminado con exito');
    res.redirect('/tienda/carrito');
});

// editar cantidad de pedido en el carrito
router.post('/editarcantidad/:id', async (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body; 
    const cantidadCambiada = {
        cantidad
    }
    await pool.query('UPDATE t_carrito set ? WHERE id = ? AND user_id = ?', [cantidadCambiada, id,req.user.id_usuario]);
    req.flash('success','Producto editado con exito');
    res.redirect('/tienda/carrito');
});

//enviar orden de compra
router.post('/comprar',usuarioLogueado, async (req, res) => {
    const venta = await pool.query('SELECT * FROM t_carrito WHERE user_id = ?', [req.user.id_usuario]);
    for (let index = 0; index < venta.length; index++) {
        await pool.query('INSERT INTO t_ventas set ?', [venta[index]]);
    }
    await pool.query('DELETE FROM t_carrito WHERE user_id = ?', [req.user.id_usuario]);
    req.flash('success','Orden de compra recibida');
    res.redirect('/tienda/carrito');
});

// pedidos recibidos para el admin
router.get('/ventas', usuarioAdmin, async (req, res) => {
    const venta = await pool.query('SELECT * FROM t_ventas');

    let total = 0;
    for (let index = 0; index < venta.length; index++) {
        total = total + (venta[index].cantidad*venta[index].precio);
    }
    res.render('tienda/ventas', { venta });
});

//marcar producto como entregado
router.get('/entregarventa/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM t_ventas WHERE id = ?', [id]);
    req.flash('success','Producto entregado con exito');
    res.redirect('/tienda/ventas');
});

// pedidos hechos por el usuario
// router.get('/pedidos', usuarioLogueado, async (req, res) => {
//     const carrito = await pool.query('SELECT * FROM t_carrito WHERE user_id = ?', [req.user.id_usuario]);
//     res.render('tienda/carrito', { carrito });
// });

module.exports = router;