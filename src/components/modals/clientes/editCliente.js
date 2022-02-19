import React, { Fragment } from "react";
import { Col, Container, Modal, Row, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";

class ModalEditarCliente extends React.Component {

    //definimos el estado
    state = {
        form: undefined
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

    peticionPut = async (event) => {
        event.preventDefault();

        let url = "https://appi-books.herokuapp.com/api/cliente/" + this.state.form.idcliente;
        let config = {
            method: "PUT",
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
        axios(config).then((response) => {
            swal("Cliente Editado", { icon: "success", });
            this.props.onCloseModal();
            this.props.fetchDataClientes();
        }).catch((error) => {
            swal("Error en el sistema", {
                icon: "error",
            });
        });
    }

    cleanModal = () => {
        this.setState({ form: undefined })
        this.props.onCloseModal();

    }

    fetchDataClientesModalEdit = async () => {

        await this.setState({ form: this.props.data })

    }

    render() {

        if (this.state.form === undefined && this.props.modalIsOpen === true) {
            this.fetchDataClientesModalEdit();
        }

        const form = this.state.form;

        return (
            <Fragment>
                <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter"
                    centered onHide={this.cleanModal}>
                    <Form onSubmit={this.peticionPut}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Editar Cliente
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
                                type="submit"
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
            </Fragment>
        )

    }

}

export default ModalEditarCliente