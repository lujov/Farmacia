function peticionProductos(){
    axios.get('http://localhost:3306/gestorproductos')
    .then((response)=>{
        mostrarProductos(response.data);  
    })
}

peticionProductos();

// muestra los productos en la tienda
function mostrarProductos(data){
    let lista_product = document.querySelector('#tienda-productos');

    data.forEach((item)=>{
        lista_product.innerHTML = `<div class="producto"><ul><li>${item.nombre}</li><li>${item.precio}</li></ul></div>`;
    })
}

// agrega productos a la tienda
function enviarDatos(e){
    e.preventDefault();
    let nombre = document.querySelector('#nombre').value;
    let precio = document.querySelector('#precio').value;
    let id_producto = document.querySelector('#id_producto').value;
    let categoria = document.querySelector('#categoria').value;
    let stock = document.querySelector('#stock').value;
    
    axios.post('http://localhost:3306/gestorproductos/productos',{
        nombre: nombre,
        precio: precio,
        id_producto: id_producto,
        categoria: categoria,
        stock: stock
    })
    alert('datos enviados');
    // window.location = 'tienda.html';
}

let formulario_product = document.querySelector('#btn-subir-producto');
formulario_product.addEventListener('click',enviarDatos);

// function eliminarProducto(e){
// console.log(e.path[1].childNodes[0].innerText);
// let productoEliminado = e.path[1].childNodes[0].innerText;
//     axios.delete(`http://localhost:8888/gestorproductos/productos/${productoEliminado}`)
//     .then(()=>{
//         alert('Producto Eliminado');
//         location.reload();
//     })
// }

