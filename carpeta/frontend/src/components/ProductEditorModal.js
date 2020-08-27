import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

export default props =>{

    const [productName, setProductName]   = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [previewProductImage, setPreviewProductImage] = useState('');

    const handleProductNameChange = event => {
        setProductName( event.target.value );
    }

    const handleProductPriceChange = event => {
        setProductPrice( event.target.value );
    }

    const handleProductImageChange = event => {
        setProductImage( event.target.files[0] );

        setPreviewProductImage( URL.createObjectURL(event.target.files[0]) )
    }

    const handleSave = ()=>{

        const formData = new FormData();

        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productImage', productImage);

        let url    = 'http://localhost:8888/productos';
        let method = 'POST';

        if ( props.idProducto ){
            url += '/' + props.idProducto;
            method = 'PUT';
        }

        fetch(url, {
            method: method,
            body: formData,
            credentials: 'include'
        })
        .then( response => response.json() )
        .then( data => {
            
            if ( data.status === 'ok' ){
                props.onProductSaved(data.message);
            }
            else{
                Swal.fire({
                    text: data.message,
                    icon: 'error'
                })
              
            }

        })
        .catch( error => {
            console.log('Error');
        })
    }

    useEffect(
        ()=>{
            if (props.idProducto){
                
                fetch(`http://localhost:8888/productos/` + props.idProducto).then(
                    response => response.json()
                ).then(
                    data =>{
                        setProductName(data.nombre);
                        setProductPrice(data.precio);
                        setProductImage('');
                        setPreviewProductImage(data.imagen);
                    }
                )

            }
            else{
                setProductName('');
                setProductPrice('');
                setProductImage('');
                setPreviewProductImage('');
            }
        }, [props.idProducto]
    )

    return (
        <Modal show={props.show} onHide={props.handleHide}>

            <Modal.Header closeButton>
                <Modal.Title>Publicación</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                
                <Form>

                    <Form.Group>
                        <Form.Label>Titulo</Form.Label>

                        <Form.Control type="text"
                                      value={productName}
                                      onChange={handleProductNameChange}
                        />

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Precio</Form.Label>

                        <Form.Control type="text"
                                      value={productPrice}
                                      onChange={handleProductPriceChange}
                        
                        />
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-center">
                        { previewProductImage &&
                            <img style={ { height : "25vh" } } src={ previewProductImage } />
                        }
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Imagen</Form.Label>

                        <Form.Control type="file"
                                      onChange={handleProductImageChange}
                        />
                    </Form.Group>

                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">
                    Cancelar
                </Button>

                <Button variant="primary"
                        onClick={ handleSave }
                >
                    Guardar
                </Button>

            </Modal.Footer>
        
        </Modal>
    )

}