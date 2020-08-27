import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {useHistory} from "react-router-dom";

export default (props) => {

    const history = useHistory();

    const [terminoBuscado, setTerminoBuscado] = useState('');

    const handleTerminoBuscadoChange = (event)=>{

        history.push("/");

        let busqueda = event.target.value;
        setTerminoBuscado(busqueda);

        props.onSearchPubs(busqueda);
    }

    return(
        <Row className="my-3 justify-content-center m-0">
            
            <Col xs={12} md={6} lg={5}>

                <Form>
                    <Form.Group>
                        <Form.Row>

                            <Col sm={10} xs={9}>
                                <Form.Control type="text" 
                                              value={terminoBuscado}
                                              onChange={handleTerminoBuscadoChange}
                                />
                            </Col>

                            <Col sm={2} xs={3}>
                                <Button>
                                    Buscar
                                </Button>
                            </Col>

                        </Form.Row>
                    </Form.Group>
                </Form>

            </Col>

        </Row>
    )}
