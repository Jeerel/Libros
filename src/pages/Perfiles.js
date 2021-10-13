import React from "react";
import "../App.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import swal from "sweetalert";
import {
    faTimes,
    faTrashAlt,
    faPlus,
    faSearch,
    faDownload,
    faEdit
} from "@fortawesome/free-solid-svg-icons";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class Perfiles extends React.Component {

    state = {
        data: [],
        dataEditorial: [],
        modalEditar: false,
        modalInsertar: false,
        modalEliminar: false,
        form: {
            name: "",
            email: "",
            type: ""
        },
        formEdit: {
            name: "",
            email: "",
            type: ""
        },
        filter: {
            nameFilter: "",
            emailFilter: "",
            typeFilter: ""
        }
    };

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    };
    modalEditar = () => {
        this.setState({ modalEditar: !this.state.modalEditar });
    };
    handleChange = async (e) => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleChangeFilter = async (e) => {
        e.persist();
        await this.setState({
            filter: {
                ...this.state.filter,
                [e.target.name]: e.target.value,
            },
        });
        console.log(this.state);
    };
    peticionDelete = async (user) => {
        swal({
            title: "Deseas eliminar al usuario " + user.nombre + "?",
            text: "No podra recuperar la información",
            icon: "warning",
            buttons: ["Cancelar", "Si, eliminar"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let url = "https://appi-books.herokuapp.com/api/empleoyes/" + user.id;
                axios
                    .delete(url)
                    .then((response) => {
                        swal("Usuario eliminado correctamente", {
                            icon: "success",
                        });
                        this.loadData();
                    })
                    .catch((error) => {
                        swal("Error en el sistema", {
                            icon: "error",
                        });
                    });
            } else {
                swal("Acción cancelada");
            }
        });
    }
    getUser = async (user) => {
        let url = "https://appi-books.herokuapp.com/api/empleoyes/" + user.id;
        axios
            .get(url)
            .then((response) => {
                this.setState({ modalEditar: !this.state.modalEditar });
                this.setState({ formEdit: response.data });
            })
            .catch((error) => { });
    }
    peticionPost = async () => {
        let url = "https://appi-books.herokuapp.com/api/empleoyes";
        axios
            .post(url, this.state.form)
            .then((response) => {
                swal("Usuario agregado", {
                    icon: "success",
                });
                this.modalInsertar();
                this.loadData();
            })
            .catch((error) => {
            });
    }
    loadData = () => {
        let url = "https://appi-books.herokuapp.com/api/empleoyes";
        axios
            .get(url)
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => { });
    }
    componentDidMount() {
        this.loadData();
    }
    updateInputValue = async (e) => {
        this.state.formEdit[e.target.name] = e.target.value;
        e.persist();
        await this.setState({
            formEdit: this.state.formEdit
        });
    };
    peticionPut = async () => {
        let obj = {
            id: this.state.formEdit.id,
            name: this.state.formEdit.nombre,
            email: this.state.formEdit.email,
            type: this.state.formEdit.tipo
        }
        let url = "https://appi-books.herokuapp.com/api/empleoyes/" + obj.id;
        axios
            .put(url, obj)
            .then((response) => {
                swal("Usuario Editado", {
                    icon: "success",
                });
                this.modalEditar();
                this.loadData();
            })
            .catch((error) => {
            });
    }

    searchFilter = async () => {
        alert("Enter");
    }

    render() {
        const { form, filter } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-11 rigth">
                            <h2>Perfiles</h2>
                        </div>
                        <div className="col-md-6 col-sm-1"></div>

                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input className="form-control" type="text" name="nameFilter" id="nameFilter" onChange={this.handleChangeFilter} value={filter ? filter.name : ""} />

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Correo</label>
                                <input className="form-control" type="email" name="emailFilter" id="emailFilter" />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Tipo</label>
                                <select className="form-control" name="tipoFilter" id="tipoFilter">
                                    <option value="">Seleccione una opción</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Ususario">Usuario</option>
                                    <option value="Invitado">Invitado</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <button onClick={() => this.searchFilter()} className="btn btn-primary btnTop">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <div className="col-md-12 col-sm-12">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Tipo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((users, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{users.nombre}</td>
                                                <td>{users.correo}</td>
                                                <td>{users.tipo}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning text-white"
                                                        onClick={() => { this.getUser(users); }}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    {"   "}
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => { this.peticionDelete(users); }}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="fixed-action-btn">
                        <button
                            className="btn-floating"
                            onClick={() => {
                                this.setState({ form: null, tipoModal: "insertar" });
                                this.modalInsertar();
                            }}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
                <Modal isOpen={this.state.modalInsertar} className="modal-md">
                    <ModalHeader style={{ display: "block" }}>
                        Nuevo Usuario
                        <span
                            style={{ float: "right" }}
                            onClick={() => this.modalInsertar()}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form ? form.name : ""} />
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Correo</label>
                                    <input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} value={form ? form.email : ""} />
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Tipo</label>
                                    <select className="form-control" name="type" id="type" onChange={this.handleChange} value={form ? form.type : ""}>
                                        <option value="">Seleccione una opción</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Ususario">Usuario</option>
                                        <option value="Invitado">Invitado</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            onClick={() => this.peticionPost()}
                            className="btn btn-primary">
                            Guardar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.modalInsertar()}>
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEditar} className="modal-md">
                    <ModalHeader style={{ display: "block" }}>
                        Editar Usuario
                        <span
                            style={{ float: "right" }}
                            onClick={() => this.modalEditar()}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input className="form-control" type="text" name="nombre" id="nameEdit" value={this.state.formEdit.nombre} onChange={this.updateInputValue} />
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Correo</label>
                                    <input className="form-control" type="email" name="correo" id="emailEdit" value={this.state.formEdit.correo} onChange={this.updateInputValue} />
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Tipo</label>
                                    <select className="form-control" name="tipo" id="typeEdit" value={this.state.formEdit.tipo} onChange={this.updateInputValue}>
                                        <option value="">Seleccione una opción</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Ususario">Usuario</option>
                                        <option value="Invitado">Invitado</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            onClick={() => this.peticionPut()}
                            className="btn btn-primary">
                            Guardar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.modalEditar()}>
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Perfiles;