import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table, Col, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import ModalEditarCliente from "../modals/clientes/editCliente";

function ClientsContent(props) {

    //asignacion de constantes, variables y estados
    const [clientes, setClientes] = useState([]);
    const [tablaClientes, setTablaClientes] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState([]);
    const [filtroDireccion, setFiltroDireccion] = useState([]);
    const [filtroTelefono, setFiltroTelefono] = useState([]);
    const [filtroCorreo, setFiltroCorreo] = useState([]);
    const functionFetchData = props.clientes.fetchDataClientes;

    const getContent = async () => {
        setClientes(props.clientes.clientes);
        setTablaClientes(props.clientes.clientes);
    };

    useEffect(() => {
        getContent();
    }, []);

    console.log('CLIENTES: ', props.clientes.clientes)

    //funciones de filtrado

    //Funcion de filtrado para el campo nombre
    const handleChangeFilterNombre = async (e) => {

        e.persist();

        setFiltroNombre(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaClientes.filter((cliente) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            if (cliente.nombre.toString().toLowerCase().includes(e.target.value.toLowerCase())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return cliente; //si lo contiene lo regresamos
            }
        });

        setClientes(arrayFiltrado);

    }
    //fin de funcion de filtrado de nombre

    //Funcion de filtrado para el campo direccion
    const handleChangeFilterDireccion = async (e) => {

        e.persist();

        setFiltroDireccion(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaClientes.filter((cliente) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            if (cliente.direccion.toString().toLowerCase().includes(e.target.value.toLowerCase())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return cliente; //si lo contiene lo regresamos
            }
        });

        setClientes(arrayFiltrado);

    }
    //fin de funcion de filtrado de direccion

    //Funcion de filtrado para el campo telefono
    const handleChangeFilterTelefono = async (e) => {

        e.persist();

        setFiltroTelefono(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaClientes.filter((cliente) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            if (cliente.telefono.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return cliente; //si lo contiene lo regresamos
            }
        });

        setClientes(arrayFiltrado);

    }
    //fin de funcion de filtrado de telefono

    //Funcion de filtrado para el campo correo
    const handleChangeFilterCorreo = async (e) => {

        e.persist();

        setFiltroCorreo(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaClientes.filter((cliente) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            if (cliente.email.toString().toLowerCase().includes(e.target.value.toLowerCase())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return cliente; //si lo contiene lo regresamos
            }
        });

        setClientes(arrayFiltrado);

    }
    //fin de funcion de filtrado de correo

    return (
        <Fragment>

            <Col xs={12} md={3} className="mt-3">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Nombre">
                    <Form.Control
                        type="text"
                        placeholder="Nombre"
                        value={filtroNombre}
                        name="nombre"
                        onChange={handleChangeFilterNombre} />
                </FloatingLabel>
            </Col>

            <Col xs={12} md={3} className="mt-3">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Dirección">
                    <Form.Control
                        type="text"
                        placeholder="Dirección"
                        value={filtroDireccion}
                        name="direccion"
                        onChange={handleChangeFilterDireccion} />
                </FloatingLabel>
            </Col>

            <Col xs={12} md={3} className="mt-3">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Teléfono">
                    <Form.Control
                        type="number"
                        placeholder="Teléfono"
                        value={filtroTelefono}
                        name="telefono"
                        onChange={handleChangeFilterTelefono} />
                </FloatingLabel>
            </Col>

            <Col xs={12} md={3} className="mt-3">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Correo">
                    <Form.Control
                        type="email"
                        placeholder="Correo"
                        value={filtroCorreo}
                        name="correo"
                        onChange={handleChangeFilterCorreo} />
                </FloatingLabel>
            </Col>

            <Col xs={12} md={12} className="mt-3">
                <ClientsTable clientes={clientes} functionFetchData={functionFetchData} />
            </Col>

        </Fragment>
    )

}

/*
class ClientsContent extends React.Component {

    state = {
        formFilter: {},
        data: this.props.clientes.clientes
    };

    render() {

        const formFilter = this.state.formFilter;
        const clientes = this.state.data;
        const functionFetchData = this.props.clientes.fetchDataClientes

        return (
            <Fragment>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            className="form-control mt-2"
                            type="text"
                            value={formFilter ? formFilter.nombre : ""}
                            name="nombre"
                            id="nombreFilter"
                            onChange={this.handleChangeFilter}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Dirección</label>
                        <input
                            className="form-control mt-2"
                            type="text"
                            value={formFilter ? formFilter.direccion : ""}
                            name="direccion"
                            id="direccionFilter"
                            onChange={this.handleChangeFilter}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            className="form-control mt-2"
                            type="number"
                            value={formFilter ? formFilter.telefono : ""}
                            name="telefono"
                            id="telefonoFilter"
                            onChange={this.handleChangeFilter}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-2 mt-2">
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            className="form-control mt-2"
                            type="email"
                            value={formFilter ? formFilter.email : ""}
                            name="email"
                            id="emailFilter"
                            onChange={this.handleChangeFilter}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-1 mt-3">
                    <button className="btn btn-primary btnTop" onClick={() => this.peticionAvanced()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className="col-xs-12 col-md-12 mt-2">
                    <ClientsTable clientes={clientes} functionFetchData={functionFetchData} />
                </div>
            </Fragment>
        );

    }

}
*/


class ClientsTable extends React.Component {

    state = {
        dataClientes: [],
        modalEditar: false,
        formEdit: undefined,
        triggerEditModal: false
    };

    handleCloseModal = async () => {
        await this.setState({ triggerEditModal: false, formEdit: undefined })
    }

    handleOpenModal = e => {
        this.setState({ triggerEditModal: true });
    };

    render() {

        const peticionDelete = async (cliente) => {
            swal({
                title: "Deseas eliminar a " + cliente.nombre + "?",
                text: "No podra recuperar la información",
                icon: "warning",
                buttons: ["Cancelar", "Si, eliminar"],
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    let config = {
                        method: "DELETE",
                        url: "https://appi-books.herokuapp.com/api/cliente/" + cliente.idcliente,
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.is_security,
                            "Content-Type": "application/json",
                        }
                    }

                    axios(config)
                        .then((response) => {
                            swal("Cliente eliminado correctamente", {
                                icon: "success",
                            });
                            functionFetchData();
                        })
                        .catch((error) => {
                            swal("Error en el sistema", {
                                icon: "error",
                            });
                        });
                } else {
                    swal("Acción cancelada")
                }
            });
        }

        const peticionEdit = async (cliente) => {
            let url = "https://appi-books.herokuapp.com/api/cliente/" + cliente.idcliente;
            let config = {
                method: "GET",
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.is_security,
                    "Content-Type": "application/json",
                }
            };
            await axios(config).then((response) => {
                this.setState({ triggerEditModal: !this.state.triggerEditModal, formEdit: response.data.body });
            }).catch((error) => {
                return error
            });
        }

        const functionFetchData = this.props.functionFetchData;

        return (

            <Fragment>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>E-mail</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.clientes.map((cliente, i) => {
                            return (
                                <tr key={i}>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.direccion}</td>
                                    <td>{cliente.telefono}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning text-white"
                                            onClick={() => { peticionEdit(cliente); }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => { peticionDelete(cliente); }}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ModalEditarCliente
                    onCloseModal={this.handleCloseModal}
                    onOpenModal={this.handleOpenModal}
                    modalIsOpen={this.state.triggerEditModal}
                    data={this.state.formEdit}
                    fetchDataClientes={functionFetchData}
                />
            </Fragment>

        );

    }

}

function ClientesM(props) {

    return (
        <Fragment>
            <ClientsContent clientes={props} />
        </Fragment>
    );

}

export default ClientesM