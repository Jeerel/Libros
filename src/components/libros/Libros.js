import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDownload, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { CSVLink } from 'react-csv';
import axios from "axios";
import swal from "sweetalert";

import ModalEditLibro from "../modals/libros/editBook";

class BooksContent extends React.Component {

    state = {
        formFilter: {},
        data: this.props.libros.libros,
        //dataEditoriales: this.props.libros.editoriales
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
    peticionAvanced = async (event) => {
        const url = "https://appi-books.herokuapp.com/api/filters/libros";
        let obj = {}
        for (let i in this.state.formFilter) {
            if (this.state.formFilter[i]) {
                obj[i] = this.state.formFilter[i];
            }
        }
        var data = obj;
        console.log(data)
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
                console.log(response.data.body)
                this.setState({ data: response.data.body });
            })
            .catch(function (error) {
            });

    }

    render() {

        const formFilter = this.state.formFilter;
        const libros = this.state.data;
        //const editoriales = this.state.dataEditoriales;
        const functionFetchData = this.props.libros.fetchDataLibros


        return (
            <Fragment>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
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
                        {/*
                            <select
                            className="form-control mt-2"
                            name="editorial"
                            id="editorial"
                            value={formFilter ? formFilter.editorial : ""}
                            onChange={this.handleChangeFilter}>
                            <option value="" selected>Seleccione una opción</option>
                            {editoriales.map((editorial, i) => {
                                return (
                                    <option key={i} value={editorial.ideditorial}>
                                        {editorial.editorialName}
                                    </option>
                                );
                            })}
                            </select>
                        */}
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
                    {/* editoriales={editoriales} */}
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

        const headers = [
            { label: "Code", key: "code" },
            { label: "*Text", key: "text" },
            /* { label: "*Unique vendor identifier", key: "Uniquevendoridentifier" },
             { label: "*Author", key: "Author" },
             /* { label: "*Title", key: "Title" },
             { label: "ISBN - hardcover", key: "ISBNhardcover" },
             { label: "ISBN - paperback", key: "ISBNpaperback" },
             { label: "*Place of publication", key: "Placeofpublication" },
             { label: "*Publisher", key: "Publisher" },
             { label: "*Date of publication", key: "Dateofpublication" },
             { label: "*Physical description", key: "Physicaldescription" },
             { label: "*Language", key: "Language" },
             { label: "*ma (yymmdd)", key: "ma" },
             { label: "*US$ (no decimal format)", key: "US" },
             { label: "*US shipping$ (no decimal format)", key: "USshipping" },
             { label: "Net amount $ (no decimal format)", key: "Netamount" },
             { label: "*Invoice number", key: "Invoicenumber" },
             { label: "*Number of copies (default is 1)", key: "Numberofcopies" },
             { label: "*Vendor code", key: "Vendorcode" },
             { label: "*Fund code", key: "Fundcode" },
             { label: "*Location (two letter location code from order)", key: "Location" },
             */
        ];

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
                        .then((response) => {
                            swal("Libro eliminado correctamente", {
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
                return error
            });
        }

        const downloadMARC21 = async (libro) => {

            data = []
            if (libro.isbn) {
                data.push({
                    code: "020",
                    text: "## $a " + libro.isbn
                })
            }
            if (libro.issn) {
                data.push({
                    code: "022",
                    text: "## $a " + libro.issn
                })
            }
            data.push({
                code: "041",
                text: "## $a spa"
            })
            data.push({
                code: "044",
                text: "## $a mx"
            })
            if (libro.autor) {
                data.push({
                    code: "100",
                    text: "0# $a " + libro.autor
                })
            }
            if (libro.titulo) {
                data.push({
                    code: "130",
                    text: "0# $a " + libro.titulo + " $f " + libro.anio
                })
            }
            data.push({
                code: "257",
                text: "## $a Mexico"
            })
            data.push({
                code: "257",
                text: "## $a Mexico"
            })
            if (libro.placePub) {
                data.push({
                    code: "260",
                    text: "## $a " + libro.placePub
                })
            }
            if (libro.descripcion) {
                data.push({
                    code: "300",
                    text: "## $a " + libro.descripcion
                })
            }
            if (libro.anio) {
                data.push({
                    code: "362",
                    text: "0#$a " + libro.anio
                })
            }
            if (libro.nota) {
                data.push({
                    code: "500",
                    text: "0#$a " + libro.nota
                })
            }

            await this.setState({ ...this.state, dataLibros: data })

            return (
                <CSVLink data={data} >
                </CSVLink>
            )

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
                                    <CSVLink data={this.state.dataLibros} headers={headers} filename={'MARC21-' + libro.titulo + '.csv'}>
                                        <button className="btn btn-primary btn-xs" onClick={() => { downloadMARC21(libro) }}>
                                            <FontAwesomeIcon icon={faDownload} />
                                        </button>
                                    </CSVLink>
                                    <button
                                        className="btn btn-warning text-white"
                                        onClick={() => { peticionEdit(libro); }}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className="btn btn-danger btn-xs"
                                        onClick={() => { peticionDelete(libro); }}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
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
                {/* editoriales={this.props.editoriales} */}
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