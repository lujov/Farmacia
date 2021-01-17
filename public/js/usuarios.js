// function peticionUsuarios(){
//     axios.get('http://localhost:8888/gestorusuarios')
//     .then((response)=>{
//         mostrarUsuarios(response.data);  
//     })
// }

// peticionUsuarios();

// // muestra los productos en la tienda
// function mostrarProductos(data){
//     let lista_product = document.querySelector('#lista-productos');

//     // VER SEGUN HTML
//     data.forEach((item)=>{
//         lista_product.innerHTML+= `<li><span>${item.nombre}</span> || <span>${item.precio}</span> || <button onclick="eliminarProducto(event)">Eliminar</button></li>`;
//     })
// }

// -------REGISTRO DE USUARIOS-------

let formulario_product = document.querySelector('#formulario-registro');

function enviarDatosUsuario(e){
    e.preventDefault();
    let nombre = document.querySelector('#nombre').value;
    let telefono = document.querySelector('#telefono').value;
    let direccion = document.querySelector('#id_direccion').value;
    let mail = document.querySelector('#mail').value;
    let dni = document.querySelector('#dni').value;
    
    axios.post('http://localhost:8888/gestorusuarios/usuarios',{
        nombre: nombre,
        telefono: telefono,
        direccion: direccion,
        mail: mail,
        dni: dni
    })
    alert('datos de usuario enviados');
    window.location = 'index.html';
}

formulario_product.addEventListener('submit',enviarDatosUsuario);



// function eliminarUsuario(e){
// console.log(e.path[1].childNodes[0].innerText);
// let usuarioEliminado = e.path[1].childNodes[0].innerText;
//     axios.delete(`http://localhost:8888/gestorusuarios/usuarios/${usuarioEliminado}`)
//     .then(()=>{
//         alert('Usuario Eliminado');
//         location.reload();
//     })
// }

