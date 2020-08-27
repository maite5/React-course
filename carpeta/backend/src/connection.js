const mysql = require('mysql');

let conexion = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'cloneml'
    }
)

conexion.connect(
    err=>{
        if (err) throw err;

        console.log('Conectado!!!');
    }
)

module.exports = conexion;
