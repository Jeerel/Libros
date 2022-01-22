import React from "react";
import { Col, Container, Modal, Row, Form } from "react-bootstrap";
import axios from "axios";

class ModalAddPerfil extends React.Component {
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
        const url = "https://appi-books.herokuapp.com/api/empleoyes";
        axios
            .post(url, this.state.form)
            .then((response) => {

                if (response.data === 'Enviado') {
                    this.props.onCloseModal();
                    this.props.fetchDataPerfiles();
                }

            })
            .catch((error) => {
                return error;
            });
    }

    cleanModal = async () => {
        await this.setState({ form: {} });
        this.props.onCloseModal();
    }

    render() {

        const form = this.state.form;

        return (
            <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="lg" aria-labelledby="contained-modal-title-vcenter"
                centered onHide={this.cleanModal}>
                <Form onSubmit={this.peticionPost}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Nuevo Perfil
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={12}>
                                    <label>
                                        Nombre
                                    </label>
                                    <input className="form-control" type="tex" name="name" id="name" onChange={this.handleChange} value={form ? form.name : ''} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={12}>
                                    <label>
                                        Correo
                                    </label>
                                    <input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} value={form ? form.email : ""} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={6}>
                                    <label>
                                        Tipo
                                    </label>
                                    <select className="form-control" name="type" id="type" onChange={this.handleChange} value={form ? form.type : ""} required>
                                        <option selected disabled value="">Seleccione una opción</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Usuario">Usuario</option>
                                        <option value="Invitado">Invitado</option>
                                    </select>
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
        );
    };
}

export default ModalAddPerfil