const mysql = require('mysql');

const conexion_db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'bd_productos'
});

conexion_db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('conexion exitosa');
    }
});

// module.exports = conexion_db