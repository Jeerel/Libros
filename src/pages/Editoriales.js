import React from "react";
import "../App.css"
import PageLoading from '../components/PageLoading'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import swal from "sweetalert";
import {
    faTimes,
    faTrashAlt,
    faPlus,
    faSearch,
    faEdit
} from "@fortawesome/free-solid-svg-icons";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class Editoriales extends React.Component {

    state = {
        loading: true,
        modalInsertar: false,
        modalEdit: false,
        nameFilter: "",
        estadoFilter: "",
        form: {
            id: "",
            nombre: "",
            estado: "",
            direccion: "",
            descripcion: ""
        },
        formEdit: {
            id: "",
            nombre: "",
            estado: "",
            direccion: "",
            descripcion: ""
        },
        data: undefined
    }

    peticionDelete = (editorial) => {
        swal({
            title: "Deseas eliminar la editorial " + editorial.editorialName + "?",
            text: "No podra recuperar la información",
            icon: "warning",
            buttons: ["Cancelar", "Si, eliminar"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let config = {
                    method: "DELETE",
                    url: "https://appi-books.herokuapp.com/api/editorial/" + editorial.ideditorial,
                    headers: {
                        'Authorization': 'Bearer '+sessionStorage.is_security,
                        "Content-Type": "application/json",
                    },
                };
                axios(config)
                    .then((response) => {
                        swal("Editorial eliminada correctamente", {
                            icon: "success",
                        });
                        this.peticionGet();
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
    };

    peticionGet = () => {
        let config = {
            method: "GET",
            url: "https://appi-books.herokuapp.com/api/editorial",
            headers: {
                'Authorization': 'Bearer '+sessionStorage.is_security,
                "Content-Type": "application/json",
            },
        };
        axios(config)
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => { });
    }

    peticionPost = async () => {
        let url = "https://appi-books.herokuapp.com/api/editorial";
        axios
            .post(url, this.state.form)
            .then((response) => {
                this.modalInsertar();
                this.peticionGet();
            })
            .catch((error) => {
            });
    }

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
                [e.target.name]: e.target.value
            },
        });
    };

    loadData = () => {
        let config = {
            method: "GET",
            url: "https://appi-books.herokuapp.com/api/editorial",
            headers: {
                'Authorization': 'Bearer '+sessionStorage.is_security,
                "Content-Type": "application/json",
            },
        };
        axios(config)
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => { });
    };

    peticionEdit = (editorial) => {
        let url = "https://appi-books.herokuapp.com/api/editorial/" + editorial.ideditorial;
        axios
            .get(url)
            .then((response) => {
                this.setState({ modalEditar: !this.state.modalEditar });
                this.setState({ formEdit: response.data });
            })
            .catch((error) => { });

    }
    searchFilter = async (e) => {
        this.state[e.target.name] = e.target.value;
        let obj = {};
        obj[e.target.name] = this.state[e.target.name];
        e.persist();
        await this.setState(obj);
    }
    updateInputValue = async (e) => {
        this.state.formEdit[e.target.name] = e.target.value;
        e.persist();
        await this.setState({
            formEdit: this.state.formEdit
        });
    };
    peticionAvanced = () => {
        let obj = {};
        if (this.state.nameFilter) {
            obj["editorialName"] = this.state.nameFilter;
        }
        if (this.state.estadoFilter) {
            obj["editorialState"] = this.state.estadoFilter;
        }
        let url = "https://appi-books.herokuapp.com/api/filters/editorial";
        axios
            .post(url, obj)
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => {
            });
    }
    peticionPut = () => {
        let obj = {
            direccion: this.state.formEdit.editorialAddress,
            descripcion: this.state.formEdit.editorialDescription,
            nombre: this.state.formEdit.editorialName,
            estado: this.state.formEdit.editorialState

        }
        let url = "https://appi-books.herokuapp.com/api/editorial/" + this.state.formEdit.ideditorial;
        axios.put(url, obj).then((response) => {
            swal("Usuario Editado", {
                icon: "success",
            });
            this.modalEditar();
            this.loadData();
        })
            .catch((error) => {
            });
    };

    componentDidMount() {
        this.loadData();
    };


    render() {

        const { form } = this.state

        if (this.state.loading === true && !this.state.data) {
            return <PageLoading />
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-11 rigth">
                            <h2>Editoriales</h2>
                        </div>
                        <div className="col-md-6 col-sm-1"></div>

                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input className="form-control" type="text" onChange={this.searchFilter} value={this.state.nameFilter} name="nameFilter" id="nameFilter" />
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Estado</label>
                                <select className="form-control" onChange={this.searchFilter} name="estadoFilter" id="estadoFilter" value={this.state.estadoFilter}>
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="Aguascalientes">Aguascalientes</option>
                                    <option value="Baja California">Baja California</option>
                                    <option value="Baja California Sur">Baja California Sur</option>
                                    <option value="Campeche">Campeche</option>
                                    <option value="Chiapas">Chiapas</option>
                                    <option value="Chihuahua">Chihuahua</option>
                                    <option value="CDMX">Ciudad de México</option>
                                    <option value="Coahuila">Coahuila</option>
                                    <option value="Colima">Colima</option>
                                    <option value="Durango">Durango</option>
                                    <option value="Estado de México">Estado de México</option>
                                    <option value="Guanajuato">Guanajuato</option>
                                    <option value="Guerrero">Guerrero</option>
                                    <option value="Hidalgo">Hidalgo</option>
                                    <option value="Jalisco">Jalisco</option>
                                    <option value="Michoacán">Michoacán</option>
                                    <option value="Morelos">Morelos</option>
                                    <option value="Nayarit">Nayarit</option>
                                    <option value="Nuevo León">Nuevo León</option>
                                    <option value="Oaxaca">Oaxaca</option>
                                    <option value="Puebla">Puebla</option>
                                    <option value="Querétaro">Querétaro</option>
                                    <option value="Quintana Roo">Quintana Roo</option>
                                    <option value="San Luis Potosí">San Luis Potosí</option>
                                    <option value="Sinaloa">Sinaloa</option>
                                    <option value="Sonora">Sonora</option>
                                    <option value="Tabasco">Tabasco</option>
                                    <option value="Tamaulipas">Tamaulipas</option>
                                    <option value="Tlaxcala">Tlaxcala</option>
                                    <option value="Veracruz">Veracruz</option>
                                    <option value="Yucatán">Yucatán</option>
                                    <option value="Zacatecas">Zacatecas</option>
                                </select>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <button onClick={() => this.peticionAvanced()} className="btn btn-primary btnTop">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <div className="col-md-12 col-sm-12">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Estado</th>
                                        <th>Dirección</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((editorials, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{editorials.editorialName}</td>
                                                <td>{editorials.editorialState}</td>
                                                <td>{editorials.editorialAddress}</td>
                                                <td>{editorials.editorialDescription}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning text-white"
                                                        onClick={() => { this.peticionEdit(editorials); }}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    {"   "}
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => { this.peticionDelete(editorials); }}>
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
                        Nueva Editorial
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
                                    <input className="form-control" type="text" name="nombre" onChange={this.handleChange} value={form ? form.nombre : ""} />
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Estado</label>
                                    <select className="form-control" name="estado" onChange={this.handleChange} value={form ? form.estado : ""}>
                                        <option value="" selected disabled>Seleccione una opción</option>
                                        <option value="Aguascalientes">Aguascalientes</option>
                                        <option value="Baja California">Baja California</option>
                                        <option value="Baja California Sur">Baja California Sur</option>
                                        <option value="Campeche">Campeche</option>
                                        <option value="Chiapas">Chiapas</option>
                                        <option value="Chihuahua">Chihuahua</option>
                                        <option value="CDMX">Ciudad de México</option>
                                        <option value="Coahuila">Coahuila</option>
                                        <option value="Colima">Colima</option>
                                        <option value="Durango">Durango</option>
                                        <option value="Estado de México">Estado de México</option>
                                        <option value="Guanajuato">Guanajuato</option>
                                        <option value="Guerrero">Guerrero</option>
                                        <option value="Hidalgo">Hidalgo</option>
                                        <option value="Jalisco">Jalisco</option>
                                        <option value="Michoacán">Michoacán</option>
                                        <option value="Morelos">Morelos</option>
                                        <option value="Nayarit">Nayarit</option>
                                        <option value="Nuevo León">Nuevo León</option>
                                        <option value="Oaxaca">Oaxaca</option>
                                        <option value="Puebla">Puebla</option>
                                        <option value="Querétaro">Querétaro</option>
                                        <option value="Quintana Roo">Quintana Roo</option>
                                        <option value="San Luis Potosí">San Luis Potosí</option>
                                        <option value="Sinaloa">Sinaloa</option>
                                        <option value="Sonora">Sonora</option>
                                        <option value="Tabasco">Tabasco</option>
                                        <option value="Tamaulipas">Tamaulipas</option>
                                        <option value="Tlaxcala">Tlaxcala</option>
                                        <option value="Veracruz">Veracruz</option>
                                        <option value="Yucatán">Yucatán</option>
                                        <option value="Zacatecas">Zacatecas</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Dirección</label>
                                    <input className="form-control" type="text" name="direccion" onChange={this.handleChange} value={form ? form.direccion : ""} />
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Descripción</label>
                                    <textarea className="form-control" type="text" name="descripcion" onChange={this.handleChange} value={form ? form.descripcion : ""} />
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
                        Editar Editorial
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
                                    <input className="form-control" type="text" name="editorialName" onChange={this.updateInputValue} value={this.state.formEdit.editorialName} />
                                    {/*
                                        <input className="form-control" type="text" name="autor" onChange={this.updateInputValue}
                                        id="autor" value={this.state.formEdit.autor} />
                                    */}
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Estado</label>
                                    <select className="form-control" name="editorialState" onChange={this.updateInputValue} value={this.state.formEdit.editorialState}>
                                        <option selected disabled>Seleccione una opción</option>
                                        <option value="Aguascalientes">Aguascalientes</option>
                                        <option value="Baja California">Baja California</option>
                                        <option value="Baja California Sur">Baja California Sur</option>
                                        <option value="Campeche">Campeche</option>
                                        <option value="Chiapas">Chiapas</option>
                                        <option value="Chihuahua">Chihuahua</option>
                                        <option value="CDMX">Ciudad de México</option>
                                        <option value="Coahuila">Coahuila</option>
                                        <option value="Colima">Colima</option>
                                        <option value="Durango">Durango</option>
                                        <option value="Estado de México">Estado de México</option>
                                        <option value="Guanajuato">Guanajuato</option>
                                        <option value="Guerrero">Guerrero</option>
                                        <option value="Hidalgo">Hidalgo</option>
                                        <option value="Jalisco">Jalisco</option>
                                        <option value="Michoacán">Michoacán</option>
                                        <option value="Morelos">Morelos</option>
                                        <option value="Nayarit">Nayarit</option>
                                        <option value="Nuevo León">Nuevo León</option>
                                        <option value="Oaxaca">Oaxaca</option>
                                        <option value="Puebla">Puebla</option>
                                        <option value="Querétaro">Querétaro</option>
                                        <option value="Quintana Roo">Quintana Roo</option>
                                        <option value="San Luis Potosí">San Luis Potosí</option>
                                        <option value="Sinaloa">Sinaloa</option>
                                        <option value="Sonora">Sonora</option>
                                        <option value="Tabasco">Tabasco</option>
                                        <option value="Tamaulipas">Tamaulipas</option>
                                        <option value="Tlaxcala">Tlaxcala</option>
                                        <option value="Veracruz">Veracruz</option>
                                        <option value="Yucatán">Yucatán</option>
                                        <option value="Zacatecas">Zacatecas</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Dirección</label>
                                    <input className="form-control" type="text" name="editorialAddress" id="editorialAddress" onChange={this.updateInputValue} value={this.state.formEdit.editorialAddress} />
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Descripción</label>
                                    <textarea className="form-control" type="text" name="editorialDescription" id="editorialDescription" onChange={this.updateInputValue} value={this.state.formEdit.editorialDescription} />
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

export default Editoriales;