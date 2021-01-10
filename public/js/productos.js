function peticionProductos(){
    axios.get('http://localhost:8888/gestorproductos')
    .then((response)=>{
        mostrarProductos(response.data);  
    })
}

peticionProductos();

// muestra los productos en la tienda
function mostrarProductos(data){
    let lista_product = document.querySelector('#lista-productos');

    // VER SEGUN HTML
    data.forEach((item)=>{
        lista_product.innerHTML+= `<li><span>${item.nombre}</span> || <span>${item.precio}</span> || <button onclick="eliminarProducto(event)">Eliminar</button></li>`;
    })
}

let formulario_product = document.querySelector('#formulario-producto');

function enviarDatos(e){
    e.preventDefault();
    let nombre = document.querySelector('#nombre').value;
    let precio = document.querySelector('#precio').value;
    let id_producto = document.querySelector('#id_producto').value;
    let categoria = document.querySelector('#categoria').value;
    let stock = document.querySelector('#stock').value;
    
    axios.post('http://localhost:8888/gestorproductos/productos',{
        nombre: nombre,
        precio: precio,
        id_producto: id_producto,
        categoria: categoria,
        stock: stock
    })
    alert('datos enviados');
    window.location = 'lista-productos.html';
}

formulario_product.addEventListener('submit',enviarDatos);

function eliminarProducto(e){
console.log(e.path[1].childNodes[0].innerText);
let productoEliminado = e.path[1].childNodes[0].innerText;
    axios.delete(`http://localhost:8888/gestorproductos/productos/${productoEliminado}`)
    .then(()=>{
        alert('Producto Eliminado');
        location.reload();
    })
}

