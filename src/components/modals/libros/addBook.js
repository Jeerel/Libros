import React from "react";
import { Col, Container, Modal, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";

class ModalAddLibro extends React.Component {

    state = {
        form: {}
    }

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
        const url = "https://appi-books.herokuapp.com/api/libros";
        let config = {
            method: "POST",
            url: url,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.is_security,
                "Content-Type": "application/json",
            },
            data: this.state.form
        };

        axios(config)
            .then((response) => {
                if (response.data.body.estatus === 'Enviado') {
                    this.props.onCloseModal();
                    this.props.fetchDataLibros();
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

        const form = this.state.form

        return (
            <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter"
                centered onHide={this.cleanModal}>
                <Form onSubmit={this.peticionPost}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Nuevo Libro
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={3}>

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Autor">
                                        <Form.Control
                                            type="text"
                                            placeholder="Autor"
                                            value={form ? form.autor : ""}
                                            name="autor"
                                            onChange={this.handleChange} required />
                                    </FloatingLabel>

                                </Col>
                                <Col xs={12} md={3}>

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Título">
                                        <Form.Control
                                            type="text"
                                            placeholder="Título"
                                            value={form ? form.titulo : ""}
                                            name="titulo"
                                            onChange={this.handleChange} required />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Editorial">
                                        <Form.Control
                                            type="text"
                                            placeholder="Editorial"
                                            value={form ? form.editorial : ""}
                                            name="editorial"
                                            onChange={this.handleChange} required />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="ISBN">
                                        <Form.Control
                                            type="text"
                                            placeholder="ISBN"
                                            value={form ? form.isbn : ""}
                                            name="isbn"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="ISSN">
                                        <Form.Control
                                            type="text"
                                            placeholder="ISSN"
                                            value={form ? form.issn : ""}
                                            name="issn"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type="submit"
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
        )
    }

}

export default ModalAddLibro;