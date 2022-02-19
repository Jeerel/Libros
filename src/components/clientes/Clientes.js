import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import ModalEditarCliente from "../modals/clientes/editCliente";

class ClientsContent extends React.Component {

    state = {
        formFilter: {},
        data: this.props.clientes.clientes
    };

    handleChangeFilter = async (e) => {
        e.persist();
        await this.setState({
            formFilter: {
                ...this.state.formFilter,
                [e.target.name]: e.target.value,
            },
        });
    }

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
                <div className="col-xs-12 col-md-3 mt-2">
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
                <div className="col-xs-12 col-md-12 mt-2">
                    <ClientsTable clientes={clientes} functionFetchData={functionFetchData} />
                </div>
            </Fragment>
        );

    }

}


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
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1Mjc5MTcwLCJleHAiOjE2NDUzMDc5NzB9.HWcMBHnPQpWH7O7vsvNuXnWQJob8Q4LLz6_grOnSFRU',
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers":
                                "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                            "Content-Type": "application/json",
                        },
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
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1Mjc5MTcwLCJleHAiOjE2NDUzMDc5NzB9.HWcMBHnPQpWH7O7vsvNuXnWQJob8Q4LLz6_grOnSFRU',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers":
                        "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                    "Content-Type": "application/json",
                },
            };
            await axios(config).then((response) => {
                this.setState({ triggerEditModal: !this.state.triggerEditModal, formEdit: response.data });
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