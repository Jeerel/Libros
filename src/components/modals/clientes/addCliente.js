import React from "react";
import { Col, Container, Modal, Row, Form } from "react-bootstrap";
import axios from "axios";

class ModalAddCliente extends React.Component {

    //declaramos el estado
    state = {
        form: {}
    };

    //declaramos sus metodos

    handleChange = async (e) => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    peticionPost = async (event) => {
        event.preventDefault();
        const url = "https://appi-books.herokuapp.com/api/cliente";
        axios
            .post(url, this.state.form)
            .then((response) => {

                if (response.data === 'Enviado') {
                    this.props.onCloseModal();
                    this.props.fetchDataClientes();
                }

            })
            .catch((error) => {
                return error;
            });
    }

    render() {
        const form = this.state.form;

        return (
            <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="lg" aria-labelledby="contained-modal-title-vcenter"
                centered onHide={this.props.onCloseModal}>
                <Form onSubmit={this.peticionPost}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Nuevo Cliente
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={12}>
                                    <label>
                                        Nombre
                                    </label>
                                    <input className="form-control" type="tex" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={12}>
                                    <label>
                                        Dirección
                                    </label>
                                    <input className="form-control" type="tex" name="direccion" id="direccion" onChange={this.handleChange} value={form ? form.direccion : ""} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={6}>
                                    <label>
                                        Teléfono
                                    </label>
                                    <input className="form-control" type="number" name="telefono" id="telefono" onChange={this.handleChange} value={form ? form.telefono : ""} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={6}>
                                    <label>
                                        E-mail
                                    </label>
                                    <input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} value={form ? form.email : ""} required autoComplete="off" />
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
                            onClick={this.props.onCloseModal}>
                            Cancelar
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    };

}

export default ModalAddCliente;