import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import TarjetaProducto from './TarjetaProducto';
import NavBarMisPublicaciones from './NavBarMisPublicaciones';
import ProductEditorModal from './ProductEditorModal';
import Swal from 'sweetalert2';

const ListadoProductos = (props)=>{

    const [ productos, setProductos ] = useState([])

    const [ showProductEditorModal, setShowProductEditorModal ] = useState(false);

    const [ selectedProduct, setSelectedProduct] = useState(null);

    const [favoritos, setFavoritos] = useState([]);

    const handleHideProductEditorModal = ()=>{
        setSelectedProduct(null);
        setShowProductEditorModal(false);
    }

    const onShowProductEditorModal = ()=>{
        setSelectedProduct(null);
        setShowProductEditorModal(true);
    }

    const handleProductSaved = (message)=>{
        setShowProductEditorModal(false);
        cargarListadoProductos();

        Swal.fire(
            {
                text: message,
                icon: 'success'
            }
        )
    } 
    
    const handleChangeFavStatus = (isFav, pubId, userId)=>{
        
        let url = 'http://localhost:8888/favoritos';

        const formData = new FormData();

        formData.append('userId', userId);
        formData.append('pubId', pubId);
        
        let method = isFav ? 'DELETE' : 'POST';

        fetch(url, {
            method,
            body: formData,
            credentials : 'include'
        }).then( response => response.json() )
        .then( data =>{
            cargarListadoProductos();

            Swal.fire(
                {
                    title: data.message,
                    icon: "success"
                }
            )

        })
    }
    
    const cargarListadoProductos = ()=>{
        
        let endpoint = 'productos';

        if ( props.type ==='productos' && props.searchPub ){
            endpoint += '/search/' + props.searchPub;
        }
        else{
            if (props.user ){

                switch (props.type){

                    case 'mispublicaciones':

                        endpoint += '/user/' + props.user.id;
                        break;
                    
                    case 'favoritos':

                        endpoint = 'favoritos/' + props.user.id;
                        break;

                }
            }
        }

        if ( props.user ){
            //Obtengo los favoritos

            fetch(`http://localhost:8888/favoritos/${props.user.id}`).then(
                response => response.json()
            ).then(
                data =>{
                    setFavoritos(data);

                    fetch( `http://localhost:8888/${endpoint}`).then(
                        response => response.json()
                    ).then(
                        data => {
                            setProductos( data );
                        }
                    )
                }
            )
        }else{
            fetch( `http://localhost:8888/${endpoint}`).then(
                response => response.json()
            ).then(
                data => {
                    setProductos( data );
                }
            )
        }
       
    }

    useEffect( cargarListadoProductos, [props.user, props.searchPub] );

    const handleEditClick = (idProducto)=>{
        setSelectedProduct(idProducto);
        setShowProductEditorModal(true);
    }

    const handleDeleteClick = (idPublicacion) =>{
        
        Swal.fire({
            title: 'Confirma que desea eliminar la publicación?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then( result =>{
            if ( result.value ){
                
                fetch(`http://localhost:8888/productos/${idPublicacion}`,
                    {
                        method: 'DELETE',
                        credentials: 'include'
                    }
                ).then(
                    response => response.json()
                ).then(
                    data =>{
                        if ( data.status === 'ok' ){
                            Swal.fire({
                                text: data.message,
                                icon: 'success'
                            });

                            cargarListadoProductos();
                        }
                        else{
                            Swal.fire({
                                text : data.message,
                                icon: 'error'
                            })
                        }
                    }
                )

            }
        })

    }

    const isUserFav = idPub =>{
        return ( favoritos.filter( favorito => idPub === favorito.id ).length );
    }

    return(


        <>

            { 
                props.type === 'mispublicaciones' &&
                    <NavBarMisPublicaciones handleShowProductEditorModal={onShowProductEditorModal}/>
            }

            <Row className="m-4">
                
                {

                    productos.map( producto =>{
                                        return(
                                            <TarjetaProducto titulo={producto.nombre}
                                                            imagen={producto.imagen}
                                                            precio={producto.precio}
                                                            id={producto.id}
                                                            type={props.type}
                                                            onEditClick={handleEditClick}
                                                            onDeleteClick={handleDeleteClick}
                                                            user={props.user}
                                                            isFav={ isUserFav(producto.id) }
                                                            onChangeFavStatus={handleChangeFavStatus}
                                            />
                                        )
                                    }

                    )

                }

            </Row>

            <ProductEditorModal show={showProductEditorModal}
                                handleHide={handleHideProductEditorModal}
                                onProductSaved={handleProductSaved}
                                idProducto={selectedProduct}
            />

        </>
    );
}

export default ListadoProductos;