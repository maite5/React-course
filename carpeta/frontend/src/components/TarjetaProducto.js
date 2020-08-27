import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import iconoNoFavorito from '../no_favorito.png';
import iconoFavorito from '../favorito.png';
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default (props)=>{

    const handleEditClick = ()=>{
        props.onEditClick( props.id );
    } 

    const handleDeleteClick = ()=>{
        props.onDeleteClick( props.id );
    }

    const handleFavClick = ()=>{
        props.onChangeFavStatus(props.isFav, props.id, props.user.id);
    }

    return(
        <Col md={4} lg={3} xl={2} className="mb-4 text-center d-flex align-items-stretch justify-content-center">

            <Card>

                <Card.Body>

                    { ( props.type === 'productos' || props.type ==='favoritos') && props.user &&
                        <img style={{cursor: "pointer"}} 
                             src={props.isFav ? iconoFavorito : iconoNoFavorito} 
                             onClick={handleFavClick}
                        />
                    }

                    <Link to={"/productos/" + props.id} className="nav-link p-0 mt-3">
                        <Card.Title style={{fonSize:"0.8rem"}} className="mb-5">
                            {props.titulo}
                        </Card.Title>
                    
                        <img
                            src={props.imagen}
                            className="card-img-top">
                        </img>
                    </Link>

                </Card.Body>

                <Card.Footer>
                    <small className="text-muted">{props.precio}</small>
                </Card.Footer>

                {
                    props.type === 'mispublicaciones' &&

                    <Row className="my-2">
                        <Col>
                            <Button variant="light"
                                    onClick={handleEditClick}        
                            >
                                <FontAwesomeIcon color="green" icon={faEdit} />
                            </Button>

                            <Button variant="light"
                                    onClick={handleDeleteClick}>
                                <FontAwesomeIcon color="red" icon={faTrash} />
                            </Button>
                        </Col>
                    </Row>
                }

            </Card>

        </Col>
    )}