const express = require('express');
const router = express.Router();
const conexion = require('../connection');
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    
    let sql = `SELECT pub_id AS id, pub_titulo AS nombre, pub_precio AS precio, pub_imagen AS imagen 
               FROM publicaciones`;

    conexion.query(sql, function(err, result, fields){
        if (err) throw err;

        res.json(result);
    })

})

router.get('/search/:terminoBuscado', (req, res) => {
    
    let sqlSearch = `SELECT pub_id AS id, pub_titulo AS nombre, pub_precio AS precio, pub_imagen AS imagen 
               FROM publicaciones
               WHERE pub_titulo LIKE ?`;

    let values = [ `%${req.params.terminoBuscado}%` ];

    conexion.query(sqlSearch, values, function(err, result, fields){
        if (err) throw err;

        res.json(result);
    })

})

router.get('/user/:id', (req, res) => {

    let sql = `SELECT pub_id AS id, pub_titulo AS nombre, pub_precio AS precio, pub_imagen AS imagen 
              FROM publicaciones 
              WHERE usr_id = ${req.params.id}`;

    conexion.query(sql, function(err, result, fields){
        if (err) throw err;

        res.json(result);
    })

})

router.get('/:id', (req, res) => {
    
    let sql = `SELECT pub_id AS id, pub_titulo AS nombre, pub_precio AS precio, pub_imagen AS imagen 
               FROM publicaciones 
               WHERE pub_id = ${req.params.id}`;

    conexion.query(sql, function(err, result, fields){
        if (err) throw err;

        res.json(result[0]);
    })

})

router.post('/', (req, res) =>{
    
    let imageFileName = '';

    if ( req.files ){

        let productImage = req.files.productImage;

        imageFileName = Date.now() + path.extname(productImage.name);

        productImage.mv( '../public/images/' + imageFileName, function(err){
            if ( err ){
                console.log(err);
            }
        } )

        console.log(imageFileName);
    }else{
        console.log('No hay archivo');
    }

    let sqlInsert = `INSERT INTO publicaciones(pub_titulo, pub_precio, pub_imagen, usr_id)
                        VALUES(
                            '${req.body.productName}',
                             ${req.body.productPrice},
                            '${process.env.IMAGES_URL + imageFileName}',
                             ${req.session.userId}
                        )`;
    
    conexion.query(sqlInsert, function(err, result, fields){
        if ( err ) { 
            res.json(
                {
                    status : 'error',
                    message : 'Error al realizar la publicación'
                }
            )
        }else{
            res.json(
                {
                    status : 'ok',
                    message : 'Publicación realizada correctamente'
                }
            )
        }
    })

})

router.put('/:id', (req, res) =>{
    
    let imageFileName = '';

    let sqlUpdate = `UPDATE publicaciones
                        SET pub_titulo = ?, 
                            pub_precio = ?`;
    let values = [
                    req.body.productName,
                    req.body.productPrice
                 ];

    if ( req.files ){

        //Borro el archivo de la imagen anterior
        conexion.query('SELECT pub_imagen FROM publicaciones WHERE pub_id=' + req.params.id, function( err, result, fields){

            if ( err ) {
             console.log('Error')
            }else{

               fs.unlink( '../public/images/' + path.basename(  result[0].pub_imagen ), err => {
                   if ( err ) throw err;

                   console.log('Archivo borrado');
               });

            }


        })

        let productImage = req.files.productImage;

        imageFileName = Date.now() + path.extname(productImage.name);

        productImage.mv( '../public/images/' + imageFileName, function(err){
            if ( err ){
                console.log(err);
            }
        } )

       
        sqlUpdate += ', pub_imagen = ?';
        values.push( process.env.IMAGES_URL + imageFileName );

    }else{
        console.log('No hay archivo');
    }

    sqlUpdate += ' WHERE pub_id = ?';
    values.push( req.params.id );

    conexion.query(sqlUpdate, values, function(err, result, fields){
        if ( err ) { 
            res.json(
                {
                    status : 'error',
                    message : 'Error al modificar la publicación'
                }
            )
        }else{
            res.json(
                {
                    status : 'ok',
                    message : 'Publicación modificada correctamente'
                }
            )
        }
    })

})

router.delete('/:id', (req, res)=>{

    let sqlDelete = `DELETE FROM publicaciones
                      WHERE pub_id = ?`;

    values = [req.params.id];

    conexion.query(sqlDelete, values, (err, result, fields)=>{

        if( err ){
            res.json(
                {
                    status: 'error',
                    message : 'Error al eliminar la publicación'
                }
            )
        }else{
            res.json(
                {
                    status: 'ok',
                    message : 'La publicación ha sido eliminada'
                }
            )           
        }

    })

})

module.exports = router;