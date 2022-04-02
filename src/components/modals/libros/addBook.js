import React from "react";
import { Col, Container, Modal, Row, Form,Button } from "react-bootstrap";
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
        console.log("EJTER")
        event.preventDefault();
        const url = "https://appi-books.herokuapp.com/api/libros";
        let config = {
            method: "POST",
            url: url,
            headers: {
                'Authorization': 'Bearer '+sessionStorage.is_security,
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
                console.log(error)
                return error;
            });
    }

    cleanModal = async () => {
        console.log("ENTER")
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
                                    <input className="form-control" type="tex" name="isbn" id="isbn" onChange={this.handleChange} value={form ? form.isbn : ""} autoComplete="off" />
                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        ISSN
                                    </label>
                                    <input className="form-control" type="tex" name="issn" id="issn" onChange={this.handleChange} value={form ? form.issn : ""} autoComplete="off" />
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