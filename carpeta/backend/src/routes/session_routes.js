const express = require('express');
const router  = express.Router();
const conexion = require('../connection');

router.post('/', (req, res) =>{

    let sql = `
                 SELECT *
                 FROM usuarios
                 WHERE usr_nick = ?
                   AND usr_password = ?`;

    let values = [
                    req.body.user,
                    req.body.password 
                 ]

    conexion.query(sql, values, (err, result, fields) => {
        
        if ( err ) {
            res.json(
                {
                    status : 'error',
                    message : 'No es posible acceder en este momento. Intente nuevamente en unos minutos.'
                }
            )
        }else{
            
            if(result.length == 1){
                req.session.user   = req.body.user;
                req.session.userId = result[0].usr_id;

                res.json(
                    {
                        status     : 'ok',
                        message    : 'sesión iniciada',
                        loggedUser : {
                                        id     : req.session.userId,
                                        nombre : result[0].usr_nombre
                                     }
                    }
                )
            }
            else{
                res.json(
                    {
                        status  : 'error',
                        message : 'Usuario y/o contraseña no validos'
                    }
                );
            }

        }
    })



})

router.delete('/', (req, res) => {
    req.session.destroy( err =>{
        if ( err ){
            res.json(
                {
                    status : 'error',
                    message : 'Error al cerrar la sesión'
                }
            )
        }else{
            res.clearCookie('cloneml');
            res.json(
                {
                    status  : 'ok',
                    message : 'Sesión cerrada'
                }
            )
        }
    })
})

module.exports = router;