import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDownload, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { CSVLink } from 'react-csv';
import axios from "axios";
import swal from "sweetalert";

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

        console.log(this.props)

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

    render() {

        let data = [];

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
                                            onClick={() => { /*peticionEdit(libro); */ }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => { /*peticionDelete(libro); */ }}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
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