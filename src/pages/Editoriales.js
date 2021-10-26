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
        console.log(editorial);
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
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers":
                            "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                        "Content-Type": "application/json",
                    },
                };
                axios(config).catch((err) => err);
                let url = "https://appi-books.herokuapp.com/api/editorial/" + editorial.ideditorial;
                axios
                    .delete(url)
                    .then((response) => {
                        swal("Editorial eliminada correctamente", {
                            icon: "success",
                        });
                        this.peticionGet();
                    })
                    .catch((error) => {
                        console.log(error);
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
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
        };
        axios(config).catch((err) => err);
        let url = "https://appi-books.herokuapp.com/api/editorial";
        axios
            .get(url)
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => { });
    }

    peticionPost = async () => {
        console.log(this.state.form);
        let url = "https://appi-books.herokuapp.com/api/editorial";
        axios
            .post(url, this.state.form)
            .then((response) => {
                console.log(response)
                this.modalInsertar();
                this.peticionGet();
            })
            .catch((error) => {
                console.log(error);
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
        console.log("ENTRO2");
        let config = {
            method: "GET",
            url: "https://appi-books.herokuapp.com/api/editorial",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
        };
        axios(config).catch((err) => err);
        let url = "https://appi-books.herokuapp.com/api/editorial";
        axios
            .get(url)
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
                console.log(this.state.formEdit)
            })
            .catch((error) => { });

    }

    updateInputValue = async (e) => {
        this.state.formEdit[e.target.name] = e.target.value;
        e.persist();
        await this.setState({
            formEdit: this.state.formEdit
        });
    };

    peticionPut = () => {
        console.log('entrandoput')
        let url = "https://appi-books.herokuapp.com/api/editorial";
        axios.put(url + this.state.form.id, this.state.form).then((response) => {
            this.modalInsertar();
            this.peticionGet();
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
                                <input className="form-control" type="text" name="nameFilter" id="nameFilter" />
                                {// <input className="form-control" type="text" name="nameFilter" id="nameFilter" onChange={this.handleChangeFilter} value={filter ? filter.name : ""} />
                                }

                            </div>
                        </div>

                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Estado</label>
                                <select className="form-control">
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
                                    <input className="form-control" type="text" name="direccion" id="editorialAddress" onChange={this.updateInputValue} value={this.state.formEdit.editorialAddress} />
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Descripción</label>
                                    <textarea className="form-control" type="text" name="descripcion" id="editorialDescription" onChange={this.updateInputValue} value={this.state.formEdit.editorialDescription} />
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