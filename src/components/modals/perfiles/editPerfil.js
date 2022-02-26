import React, { Fragment } from "react";
import { Col, Container, Modal, Row, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";

class ModalEditarPerfil extends React.Component {

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
        const obj = {
            id: this.state.form.id,
            name: this.state.form.nombre,
            email: this.state.form.email,
            type: this.state.form.tipo
        }
        event.preventDefault();
        let url = "https://appi-books.herokuapp.com/api/empleoyes/" + obj.id;
        let config = {
            method: "PUT",
            url: url,
            headers: {
                'Authorization': 'Bearer '+sessionStorage.is_security,
                "Content-Type": "application/json",
            },
            data: obj
        };

        axios(config).then((response) => {
            swal("Perfil Editado", { icon: "success", });
            this.props.onCloseModal();
            this.props.fetchDataPerfiles();
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

    fetchDataPerfilesModalEdit = async () => {

        await this.setState({ form: this.props.data })

    }

    render() {

        if (this.state.form === undefined && this.props.modalIsOpen === true) {
            this.fetchDataPerfilesModalEdit();
        }

        const form = this.state.form;

        return (
            <Fragment>
                <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter"
                    centered onHide={this.cleanModal}>
                    <Form onSubmit={this.peticionPut}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Editar Perfil
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
                                            Correo
                                        </label>
                                        <input className="form-control" type="email" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.correo : ""} required autoComplete="off" />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <label>
                                            Tipo
                                        </label>
                                        <select className="form-control" name="tipo" id="tipo" onChange={this.handleChange} value={form ? form.tipo : ""} required>
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

export default ModalEditarPerfil;