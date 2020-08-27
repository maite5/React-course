import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import logo from '../logo.png';
import LoginModal from './LoginModal';

const NavigationBar = (props) => {

    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleHideLoginModal = () =>{
        setShowLoginModal(false);
    }

    const handleShowLoginModal = () =>{
        setShowLoginModal(true);
    }

    return(
        <>
            <Navbar style={ { backgroundColor : "#e1bee7" } } expand="lg">

                
                <Link to="/" className="navbar-brand">
                    <img style={{ height : "2rem", marginRight : "0.5rem" }} src={logo}></img>
                    <Navbar.Text>Artenini</Navbar.Text>

                    <Link to="/ContactPage" className="nav-link">
                                        Contactanos
                                    </Link>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ml-auto">

                        { !props.user 
                            ?
                                <Button 
                                    variant="primary alert"
                                    onClick={ handleShowLoginModal }
                                >
                                    Iniciar sesión
                                </Button>
                            :
                                <>
                                    <Link to="/mispublicaciones" className="nav-link">
                                        Mis publicaciones
                                    </Link>

                                    <Link to="/favoritos" className="nav-link">
                                        Favoritos
                                    </Link>

                                    <Link to="/ContactPage" className="nav-link">
                                        Contactanos
                                    </Link>


                                    <NavDropdown alignRight title={props.user.nombre} >
                                        <NavDropdown.Item>Mi cuenta</NavDropdown.Item>
                                        <NavDropdown.Divider />

                                        <NavDropdown.Item onClick={props.handleLogout}>
                                            Cerrar sesión
                                        </NavDropdown.Item>
                                    </NavDropdown> 
                                </>
                        }

                    </Nav>

                </Navbar.Collapse>

            </Navbar>

            <LoginModal show={showLoginModal}
                        handleHide={handleHideLoginModal}
                        handleLoginSuccess={props.handleLoginSuccess}
                        />
        </>
    )

}

export default NavigationBar;