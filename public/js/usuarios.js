// -------REGISTRO DE USUARIOS-------

function enviarDatosUsuario(e){
    e.preventDefault();
    let nombre = document.querySelector('#nombre-apellido').value;
    let telefono = document.querySelector('#telefono').value;
    let direccion = document.querySelector('#direccion').value;
    let mail = document.querySelector('#mail').value;
    let dni = document.querySelector('#dni').value;
    
    axios.post('http://localhost:3306/registro',{
        nombre: nombre,
        telefono: telefono,
        direccion: direccion,
        mail: mail,
        dni: dni
    })
    alert('datos de usuario enviados');
    window.location = 'index.html';
}

let formulario_registro = document.querySelector('#guardar');
formulario_registro.addEventListener('click',enviarDatosUsuario);



// function eliminarUsuario(e){
// console.log(e.path[1].childNodes[0].innerText);
// let usuarioEliminado = e.path[1].childNodes[0].innerText;
//     axios.delete(`http://localhost:8888/gestorusuarios/usuarios/${usuarioEliminado}`)
//     .then(()=>{
//         alert('Usuario Eliminado');
//         location.reload();
//     })
// }

