import React, { useState } from "react";
import { Col, Container, Modal, Row, Form, Table, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class ModalAddCotizacion extends React.Component {

    state = {
        form: {
            dataClientes: this.props.clientes,
            dataLibros: this.props.libros,
            arrayCotizacionLibros: []
        }
    }

    /*handleChange = async (e) => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };*/

    /*peticionPost = async (event) => {
        event.preventDefault();
        const url = "https://appi-books.herokuapp.com/api/libros";
        let config = {
            method: "POST",
            url: url,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1Mjc5MTcwLCJleHAiOjE2NDUzMDc5NzB9.HWcMBHnPQpWH7O7vsvNuXnWQJob8Q4LLz6_grOnSFRU',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            data: this.state.form
        };
        axios(config)
            .then((response) => {

                if (response.data === 'Enviado') {
                    this.props.onCloseModal();
                    this.props.fetchDataLibros();
                }

            })
            .catch((error) => {
                return error;
            });
    }*/

    cleanModal = async () => {
        await this.setState({ form: {} });
        this.props.onCloseModal();
    }

    render() {

        //const [arrayCotizacionLibros, setArrayCotizacionLibros] = useState([]);

        const pushLibro = async (libro) => {

            await this.state.arrayCotizacionLibros ? //preguntamos si hay datos en array
                this.setState({ //si hay datos entonces ejecutamos este set state
                    ...this.state,
                    arrayCotizacionLibros: [
                        ...this.state.arrayCotizacionLibros,
                        libro
                    ]
                }) :
                this.setState({ //si no hay datos entonces usaremos este set state
                    ...this.state,
                    arrayCotizacionLibros: [
                        libro
                    ]
                });
            console.log(this.state.arrayCotizacionLibros);
        }

        const form = this.state.form

        return (
            <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter"
                centered onHide={this.cleanModal}>
                <Form onSubmit={this.peticionPost}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Nueva Cotización
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={3}>
                                    <label>
                                        Cliente
                                    </label>
                                    <select className="form-control mt-2" name="cliente" id="cliente" value={form ? form.cliente : ""} onChange={this.handleChange}>
                                        <option value="" selected disabled>Seleccione una opción</option>
                                        {this.props.clientes.map((cliente, i) => {
                                            return (
                                                <option key={i} value={cliente.idcliente}>
                                                    {cliente.nombre}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        Libros seleccionados
                                    </label>
                                    <Col md={6} className="mt-3">
                                        {
                                            this.state.arrayCotizacionLibros ?
                                                this.state.arrayCotizacionLibros.map((libro, i) => {
                                                    return (
                                                        <Button variant="info" className="mt-2">
                                                            {libro.titulo} <Badge bg="dark">1</Badge>
                                                        </Button>
                                                    )
                                                }) :
                                                <p>Agregue los libros que desea agregar a la cotizacion en la tabla siguiente</p>
                                        }
                                    </Col>
                                </Col>
                                <Col xs={12} md={6}>
                                    <label>
                                        Libros dentro de Stock
                                    </label>
                                    <Table className="mt-3" responsive>
                                        <thead>
                                            <tr>
                                                <th>Título</th>
                                                <th>Autor</th>
                                                <th>Editorial(es)</th>
                                                <th>ISBN / ISSN</th>
                                                <th>Stock</th>
                                                <th>Agregar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.libros.map((libro, i) => {
                                                return (
                                                    <tr>
                                                        <td>{libro.titulo}</td>
                                                        <td>{libro.autor}</td>
                                                        <td>{libro.editorial}</td>
                                                        <td>{libro.isbn}</td>
                                                        <td>{libro.numCopias}</td>
                                                        <td>
                                                            <Button variant="success" size="sm" onClick={() => { pushLibro(libro); }}>
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="btn btn-primary">
                            Guardar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={this.cleanModal}>
                            Cancelar
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }

}

export default ModalAddCotizacion;