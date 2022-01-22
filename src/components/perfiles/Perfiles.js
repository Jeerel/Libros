import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import ModalEditarPerfil from "../modals/perfiles/editPerfil";

class PerfilesContent extends React.Component {

    state = {
        formFilter: {},
        data: this.props.perfiles.perfiles
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
        const perfiles = this.state.data;
        const functionFetchData = this.props.perfiles.fetchDataPerfiles

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
                        <label>Correo</label>
                        <input
                            className="form-control mt-2"
                            type="email"
                            value={formFilter ? formFilter.correo : ""}
                            name="correo"
                            id="correoFilter"
                            onChange={this.handleChangeFilter}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Tipo</label>
                        <select className="form-control" name="tipoFilter" id="tipoFilter" onChange={this.handleChangeFilter} value={formFilter ? formFilter.tipo : ""}>
                            <option selected disabled value="">Seleccione una opción</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Usuario">Usuario</option>
                            <option value="Invitado">Invitado</option>
                        </select>
                    </div>
                </div>
                <div className="col-xs-12 col-md-12 mt-2">
                    <PerfilesTable perfiles={perfiles} functionFetchData={functionFetchData} />
                </div>
            </Fragment>
        )

    }

}

class PerfilesTable extends React.Component {

    state = {
        dataPerfiles: [],
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

        const peticionDelete = async (perfil) => {
            swal({
                title: "Deseas eliminar a " + perfil.nombre + "?",
                text: "No podra recuperar la información",
                icon: "warning",
                buttons: ["Cancelar", "Si, eliminar"],
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    let config = {
                        method: "DELETE",
                        url: "https://appi-books.herokuapp.com/api/empleoyes/" + perfil.id,
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers":
                                "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                            "Content-Type": "application/json",
                        },
                    }
                    axios(config).catch((err) => err);
                    let url = "https://appi-books.herokuapp.com/api/empleoyes/" + perfil.id;
                    axios
                        .delete(url)
                        .then((response) => {
                            swal("Perfil eliminado correctamente", {
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

        const peticionEdit = async (perfil) => {
            let url = "https://appi-books.herokuapp.com/api/empleoyes/" + perfil.id;
            await axios.get(url).then((response) => {
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
                            <th>Correo</th>
                            <th>Tipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.perfiles.map((perfil, i) => {
                            return (
                                <tr key={i}>
                                    <td>{perfil.nombre}</td>
                                    <td>{perfil.correo}</td>
                                    <td>{perfil.tipo}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning text-white"
                                            onClick={() => { peticionEdit(perfil); }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => { peticionDelete(perfil); }}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ModalEditarPerfil
                    onCloseModal={this.handleCloseModal}
                    onOpenModal={this.handleOpenModal}
                    modalIsOpen={this.state.triggerEditModal}
                    data={this.state.formEdit}
                    fetchDataPerfiles={functionFetchData}
                />
            </Fragment>
        );

    }

}

function PerfilesM(props) {

    return (
        <Fragment>
            <PerfilesContent perfiles={props} />
        </Fragment>
    )

}

export default PerfilesM;
