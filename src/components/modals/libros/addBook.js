import React from "react";
import { Col, Container, Modal, Row, Form } from "react-bootstrap";
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
                                    <label>
                                        Autor
                                    </label>
                                    <input className="form-control" type="tex" name="autor" id="autor" onChange={this.handleChange} value={form ? form.autor : ''} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        Título
                                    </label>
                                    <input className="form-control" type="tex" name="titulo" id="titulo" onChange={this.handleChange} value={form ? form.titulo : ""} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        Editorial
                                    </label>
                                    <input className="form-control" type="tex" name="editorial"
                                        id="editorial" onChange={this.handleChange} value={form ? form.editorial : ""} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        ISBN
                                    </label>
                                    <input className="form-control" type="tex" name="isbn" id="isbn" onChange={this.handleChange} value={form ? form.isbn : ""} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        ISSN
                                    </label>
                                    <input className="form-control" type="tex" name="issn" id="issn" onChange={this.handleChange} value={form ? form.issn : ""} required autoComplete="off" />
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

export default ModalAddLibro;