import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useParams} from 'react-router-dom';

export default ()=>{

    let { id } = useParams();

    let [producto, setProducto] = useState(null);

    useEffect(
        
        ()=>{

            fetch('http://localhost:8888/productos/' + id).then(
                response => response.json()
            ).then( data => {
                setProducto(data);
                console.log(data)
            })
        }, []

    )

    return(

        producto &&
            <Row className="d-flex justify-content-center">
                <Col md={4} className="d-flex justify-content-center">
                    <img src={producto.imagen} className="img-fluid"/>
                </Col>

                <Col md={4}>
                    <h2>{producto.nombre}</h2>
                    <h3>{producto.precio}</h3>
                </Col>
            </Row>


    )
    
}