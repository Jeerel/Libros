import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // faDownload
import { Table, Button, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import ModalEditLibro from "../modals/libros/editBook";

class BooksContent extends React.Component {

    state = {
        formFilter: {},
        formFilterPrueba: {},
        data: this.props.libros.libros,
    }

    handleChangeFilter = async (e) => {
        e.persist();
        await this.setState({
            formFilter: {
                ...this.state.formFilter,
                [e.target.name]: e.target.value,
            },
        });
    }

    peticionAvanced = async () => {
        let obj = {}
        for (let i in this.state.formFilter) {
            if (this.state.formFilter[i]) {
                obj[i] = this.state.formFilter[i];
            }
        }
        var data = obj;
        var config = {
            method: 'POST',
            url: 'https://appi-books.herokuapp.com/api/filters/libros',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.is_security,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                this.setState({ data: response.data.body });
            })
            .catch(function (error) {
                swal("Error en el sistema", {
                    icon: "error",
                });
                return error;
            });

    }

    render() {

        const formFilter = this.state.formFilter;
        const formFilterPrueba = this.state.formFilterPrueba;
        const libros = this.state.data;
        const functionFetchData = this.props.libros.fetchDataLibros


        let handleChangeFilterPrueba = async (e) => {
            e.persist();
            await this.setState({
                formFilterPrueba: {
                    ...this.state.formFilterPrueba,
                    [e.target.name]: e.target.value,
                },
            });
            console.log('DATA ORIGINAL: ', this.state.data)

            let auxData = []
            auxData = this.state.data

            console.log(typeof auxData)
            //vamos a hacer uso de la constante que se pasara a variable 'libros' para hacer filtrado de la informacion  con la funcion de abajo
            auxData.filter(filterPrueba)
        }

        function filterPrueba(libro) {
            console.log('iterando todo el arreglo', libro)
        }


        return (
            <Fragment>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Prueba">
                            <Form.Control
                                type="text"
                                placeholder="Prueba"
                                value={formFilterPrueba ? formFilterPrueba.prueba : ""}
                                name="Prueba"
                                onChange={handleChangeFilterPrueba} required />
                        </FloatingLabel>
                        <label>ISBN/ISSN</label>
                        <input
                            className="form-control mt-2"
                            type="text"
                            value={formFilter ? formFilter.isbn : ""}
                            name="isbn"
                            id="ISSNFilter"
                            onChange={this.handleChangeFilter}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Título</label>
                        <input
                            className="form-control mt-2"
                            type="text"
                            name="titulo"
                            id="TituloLibroFilter"
                            onChange={this.handleChangeFilter}
                            value={formFilter ? formFilter.titulo : ""}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Autor</label>
                        <input
                            className="form-control mt-2"
                            type="text"
                            name="autor"
                            id="AutorFilter"
                            onChange={this.handleChangeFilter}
                            value={formFilter ? formFilter.autor : ""}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Editorial</label>
                        <input className="form-control mt-2" type="text" name="editorial" id="editorial" onChange={this.handleChangeFilter} value={formFilter ? formFilter.editorial : ""} autoComplete="off" required />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Año</label>
                        <input
                            className="form-control mt-2"
                            type="number"
                            name="anio"
                            id="anioFilter"
                            onChange={this.handleChangeFilter}
                            value={formFilter ? formFilter.anio : ""}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Estado</label>
                        <select className="form-control mt-2" name="placePub"
                            value={formFilter ? formFilter.placePub : ""} onChange={this.handleChangeFilter}>
                            <option value="" selected>Seleccione una opción</option>
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
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Palabras Clave</label>
                        <input
                            className="form-control mt-2"
                            type="text"
                            name="palabraClaveFilter"
                            id="palabraClaveFilter" />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-3">
                    <button className="btn btn-primary btnTop" onClick={() => this.peticionAvanced()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className="col-xs-12 col-md-12 mt-5">
                    <BookTable libros={libros} functionFetchData={functionFetchData} />

                </div>
            </Fragment>
        )

    }

}

class BookTable extends React.Component {

    state = {
        dataLibros: [],
        modalEditar: false,
        formEdit: undefined,
        triggerEditModal: false
    };

    handleCloseModal = async () => {

        await this.setState({ triggerEditModal: false })
    }

    handleOpenModal = e => {
        this.setState({ triggerEditModal: true });
    };

    render() {
        let data = [];

        const peticionDelete = async (libro) => {
            swal({
                title: "Deseas eliminar el libro " + libro.titulo + "?",
                text: "No podra recuperar la información",
                icon: "warning",
                buttons: ["Cancelar", "Si, eliminar"],
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    let config = {
                        method: "DELETE",
                        url: "https://appi-books.herokuapp.com/api/libros/" + libro.idLibro,
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.is_security,
                            "Content-Type": "application/json",
                        }
                    };

                    axios(config)
                        .then(() => {
                            swal("Libro eliminado correctamente", {
                                icon: "success",
                            });
                            functionFetchData();
                        })
                        .catch(() => {
                            swal("Error en el sistema", {
                                icon: "error",
                            });
                        });
                } else {
                    swal("Acción cancelada");
                }
            });
        }

        const peticionEdit = async (libro) => {
            let url = "https://appi-books.herokuapp.com/api/libros/" + libro.idLibro;
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
                swal("Error en el sistema", {
                    icon: "error",
                });
                return error
            });
        }

        const functionFetchData = this.props.functionFetchData

        return (
            < Fragment>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Autor</th>
                            <th>Título</th>
                            <th>Editorial(s)</th>
                            <th>ISBN/ISSN</th>
                            <th>Año</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.libros.map((libro, i) => {
                            return (<tr key={i}>
                                <td>{libro.autor}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.editorial}</td>
                                <td>{libro.isbn}</td>
                                <td>{libro.anio}</td>
                                <td>

                                    <Button onClick={() => { peticionEdit(libro); }} className="text-white" variant="warning" size="sm"><FontAwesomeIcon icon={faEdit} /></Button>

                                    <Button onClick={() => { peticionDelete(libro); }} variant="danger" size="sm"><FontAwesomeIcon icon={faTrashAlt} /></Button>

                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ModalEditLibro
                    onCloseModal={this.handleCloseModal}
                    onOpenModal={this.handleOpenModal}
                    modalIsOpen={this.state.triggerEditModal}
                    data={this.state.formEdit}
                    fetchDataLibros={functionFetchData}
                />
            </Fragment>
        )
    }

}

function Libros(props) {

    return (
        <Fragment>
            <BooksContent libros={props} />
        </Fragment>
    )

}

export default Libros;