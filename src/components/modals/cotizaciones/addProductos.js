import React from "react";
import { Col, Container, Modal, Row, Form } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

class ModalAddCliente extends React.Component {

    //declaramos el estado
    state = {
        form: {},
        dataLibros: undefined,
        arrayPrueba: []
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

    fechGetDataLibros = async () => {
        await this.setState({
            dataLibros: this.props.dataLibros
        })
    }

    pushData = async (obj) => {
        let flag=true;
        var data=this.state.arrayPrueba;
        for(let i=0;i<data.length;i++){
            if(data[i].idLibro == obj.idLibro){
                flag=false;
                break;
            }
        }
        if(flag){
        obj.cantidad = 1;
        if (obj.precio) {
            obj.precio = parseFloat(obj.precio);
        } else {
            obj.precio = 1
        }
        await this.setState({ arrayPrueba: [...this.state.arrayPrueba, obj] })
        await this.props.addProducto(this.state.arrayPrueba)
    }else{
        swal("Ya se agrego el libro con id: " + obj.idLibro, {icon: "error",});
    }
    }

    render() {
        if (this.state.dataLibros === undefined && this.props.modalIsOpen === true) {
            this.fechGetDataLibros()
        }
        const form = this.state.form;
        if (this.props.modalIsOpen && this.state.dataLibros) {
            return (
                <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="lg" aria-labelledby="contained-modal-title-vcenter"
                    centered onHide={this.cleanModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Buscar productos
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={10}>
                                    <label>
                                        Buscar
                                    </label>
                                    <input className="form-control" type="tex" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} required autoComplete="off" />
                                </Col>

                                <Col xs={12} md={12}>
                                    <table className="table responsive">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Titulo</th>
                                                <th>Cantidad</th>
                                                <th>Precio unit</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.dataLibros.map((libro, i) => {
                                                return (
                                                    <tr key={(i)}>
                                                        <td>{i + 1}</td>
                                                        <td>{libro.titulo}</td>
                                                        <td>
                                                            <input className="form-control" type="number"name="nombre{i}" id="nombre{i}" value={libro.cantidad} onChange={this.handleChange} min="1" />
                                                        </td>
                                                        <td>{libro.precio}</td>
                                                        <td>{libro.precio * 2}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary btn-xs" onClick={() => { this.pushData(libro); }}>
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
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
                </Modal>
            );
        }
        return null
    };

}

export default ModalAddCliente;