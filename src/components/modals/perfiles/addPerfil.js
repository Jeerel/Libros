import React from "react";
import { Col, Container, Modal, Row, Form,Button } from "react-bootstrap";
import axios from "axios";

class ModalAddPerfil extends React.Component {
    //declaramos el estado
    state = {
        form: {
            pass: 123
        }
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

        //const url = "localhost:8000/api/empleoyes";
        let config = {
            method: "POST",
            url: url,
            headers: {
                'Authorization': 'Bearer '+sessionStorage.is_security,
                "Content-Type": "application/json",
            },
            data: this.state.form
        };
        console.log('antes de hacer post', config)
        axios(config)
            .then((response) => {

                if (response.data.isCreate) {
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
                                        <option selected disabled value="">Seleccione una opci??n</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Usuario">Usuario</option>
                                        <option value="Invitado">Invitado</option>
                                    </select>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="btn btn-primary">
                            Guardar
                        </Button>
                        <Button
                            variant="btn btn-danger"
                            onClick={this.cleanModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    };
}

export default ModalAddPerfil