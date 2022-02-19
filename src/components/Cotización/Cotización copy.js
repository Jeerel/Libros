import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faPrint, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import ModalEditarCliente from "../modals/clientes/editCliente";
import ModalAddProducto from "../modals/cotizaciones/addProductos";

class ClientsContent extends React.Component {

    state = {
        formFilter: {},
        infoCliene: {},
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

    setClientes(objs) {
    }

    handleChange = async (e) => {
        var splitData = e.target.value.split("@@")
        await this.setState({
            infoCliene: {
                ... this.state.infoCliene,
                id: splitData[0],
                telefono: splitData[2],
                email: splitData[3]
            }
        });
        await this.props.clientes.setClienteState(this.state.infoCliene)
        //setClienteState
    }


    getCliente = async (obj) => {
        /* await this.setState({ arrayPrueba: [...this.state.arrayPrueba, obj] })
        await this.props.addProducto(this.state.arrayPrueba)   */
    }
    render() {
        const formFilter = this.state.formFilter;
        const infoCliene = this.state.infoCliene;
        const clientes = this.state.data;
        const functionFetchData = this.props.clientes.fetchDataClientes
        const dataClientes = this.props.clientes.clientesArray
        const options = this.props.clientes.clientesArray
        const peticionEdit = async () => {
            let url = "https://appi-books.herokuapp.com/api/libros/";
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
        return (
            <Fragment>
                <div className="col-xs-12 col-md-6">
                    <div className="row">
                        <div className="col-xs-12 col-md-6 mt-2">
                            <div className="form-group">
                                <label>Cliente</label>
                                <select className="form-control" onBlur={this.handleChange} name="idCliente" id="idCliente" >
                                    <option selected disabled value="">Seleccione una opción</option>
                                    {options.map((option) => (
                                        <option value={option.idcliente + "@@" + option.nombre + "@@" + option.telefono + "@@" + option.email} >{option.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6 mt-2">
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input
                                    className="form-control mt-2"
                                    type="number"
                                    value={infoCliene ? infoCliene.telefono : ""}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 mt-2">
                            <div className="form-group">
                                <label>E-mail</label>
                                <input
                                    className="form-control mt-2"
                                    type="email"
                                    value={infoCliene ? infoCliene.email : ""}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-md-12 mt-2">
                    <ClientsTable clientes={clientes} functionFetchData={functionFetchData} />
                </div>
                <ModalAddProducto
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

class ClientsTable extends React.Component {

    state = {
        dataClientes: [],
        modalEditar: false,
        formEdit: undefined,
        triggerEditModal: false,
        dataProductos: [{ id: 2 }]
    };
    componentDidUpdate() {

    }
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
            let url = "https://appi-books.herokuapp.com/api/libros/";
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
        /*  this.setState({
             dataProductos:[{id:2},{id:22}]
         }) */
        const functionFetchData = this.props.fetchDataLibros;
        return (
            <Fragment>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titulo</th>
                            <th>Precio unit</th>
                            <th>Precio total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dataProductos.map((cliente, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{cliente.titulo}</td>
                                    <td>{cliente.precio}</td>
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