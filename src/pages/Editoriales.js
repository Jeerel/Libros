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

class Editoriales extends React.Component {

    state = {
        data: [
            {
                nombre: 'Almadía',
                estado: 'CDMX',
                direccion: 'Av. Patriotismo 165, Escandón II Secc, Miguel Hidalgo, 11800',
                descripcion: ''
            },
            {
                nombre: 'Antílope',
                estado: 'CDMX',
                direccion: 'Tehuantepec #50, Roma Sur, Cuauhtémoc, 06760',
                descripcion: ''
            },
            {
                nombre: 'Argonáutica',
                estado: 'Monterrey',
                direccion: '',
                descripcion: 'solo compras por internet'
            }
        ]
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    };

    modalEditar = () => {
        this.setState({ modalEditar: !this.state.modalEditar });
    };

    render() {
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
                                <input className="form-control" type="text" name="nameFilter" id="nameFilter" />
                                {// <input className="form-control" type="text" name="nameFilter" id="nameFilter" onChange={this.handleChangeFilter} value={filter ? filter.name : ""} />
                                }

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
                                                <td>{editorials.nombre}</td>
                                                <td>{editorials.estado}</td>
                                                <td>{editorials.direccion}</td>
                                                <td>{editorials.descripcion}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning text-white"
                                                        onClick={() => { this.modalEditar(editorials); }}>
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
                                    <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} />
                                    {//<input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form ? form.name : ""} />
                                    }
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Estado</label>
                                    <select className="form-control" name="estado" id="estado" onChange={this.updateInputValue}>
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
                                    {//<input className="form-control" type="text" name="apellidos" id="email" onChange={this.handleChange} value={form ? form.email : ""} />
                                    }
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Dirección</label>
                                    <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} />
                                    {//<input className="form-control" type="text" name="apellidos" id="email" onChange={this.handleChange} value={form ? form.email : ""} />
                                    }
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Descripción</label>
                                    <textarea className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} />
                                    {//<input className="form-control" type="text" name="apellidos" id="email" onChange={this.handleChange} value={form ? form.email : ""} />
                                    }
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
                                    <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} />
                                    {//<input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form ? form.name : ""} />
                                    }
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Estado</label>
                                    <select className="form-control" name="estado" id="estado" onChange={this.updateInputValue}>
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
                                    {//<input className="form-control" type="text" name="apellidos" id="email" onChange={this.handleChange} value={form ? form.email : ""} />
                                    }
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Dirección</label>
                                    <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} />
                                    {//<input className="form-control" type="text" name="apellidos" id="email" onChange={this.handleChange} value={form ? form.email : ""} />
                                    }
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Descripción</label>
                                    <textarea className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} />
                                    {//<input className="form-control" type="text" name="apellidos" id="email" onChange={this.handleChange} value={form ? form.email : ""} />
                                    }
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button

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