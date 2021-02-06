// --- SECCION PARA CREAR ENLACES ---
const express = require('express');
const router = express.Router();

// conexion con base de datos
const pool = require('../database');

// ruta para acceder a la tienda
router.get('/', async (req, res) => {
    const tienda = await pool.query('SELECT * FROM t_productos');
    res.render('tienda/tienda', { tienda });
});

// ruta para agregar productos a la base de datos
router.get('/agregarproducto',(req,res) => {
    res.render('tienda/agregarproducto')
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
router.get('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM t_productos WHERE ID = ?', [id]);
    req.flash('success','Producto eliminado con exito');
    res.redirect('/tienda'); 
});

// ruta para ver el producto a editar
router.get('/editar/:id', async (req, res) => {
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

router.get('/carrito', async (req, res) => {
    const tienda = await pool.query('SELECT * FROM t_productos');
    res.render('tienda/carrito', { tienda });
});

module.exports = router;