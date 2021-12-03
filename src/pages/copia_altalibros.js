import React, { useState } from "react";
import "../App.css"
import PageLoading from "../components/PageLoading";
import { CSVLink } from 'react-csv'

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

class AltaLibros extends React.Component {

    state = {
        dataLibros: [],
        loading: true,
        data: undefined,
        dataEditorial: [],
        modalInsertar: false,
        modalEdit: false,
        modalEliminar: false,
        form: {
            id: "",
            nombre: "",
            pais: "",
            capital_bursatil: "",
            tipoModal: "",
        },
        formFilter: {},
        formEdit: {
            id: "",
            nombre: ""
        },
    };

    peticionGet = () => {
        let config = {
            method: "GET",
            url: "https://appi-books.herokuapp.com/api/libros",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
        };
        axios(config).catch((err) => err);
        let url = "https://appi-books.herokuapp.com/api/libros";
        axios
            .get(url)
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => { });
    };
    peticionPost = async () => {
        let url = "https://appi-books.herokuapp.com/api/libros";
        axios
            .post(url, this.state.form)
            .then((response) => {
                this.modalInsertar();
                this.peticionGet();
            })
            .catch((error) => {
            });
    };
    downloadMARC = (data) => {
        let name = ""
        if (data.autor === 1) {
            name = "Alvarez, Rolando."
        } else if (data.autor === 2) {
            name = "Salinas de Gortari, Carlos."
        } else if (data.autor === 3) {
            name = "Pichardo Pagaza, Ignacio"
        }
        var date = new Date(data.fecha);
        var year = date.getFullYear().toString()
        var month = date.getMonth() + 1
        if (month < 10) {
            month = "0" + month;
        }
        var day = date.getDay();
        var datasAll = JSON.stringify(data)
        const fileData = "MARC 001, 035" + data.idProv
            + "\n----------------------------------"
            + "\n100$a " + name
            + "\n----------------------------------"
            + "\n245$a " + data.titulo
            + "\n----------------------------------"
            + "\n20$a " + data.isbn
            + "\n----------------------------------"
            + "\n260$a " + data.anio
            + "\n----------------------------------"
            + "\n260$b " + data.editorialName
            + "\n----------------------------------"
            + "\n260$c " + data.anio
            + "\n----------------------------------"
            + "\n300 " + data.descripcion
            + "\n----------------------------------"
            + "\n980$a " + year + month.toString() + day.toString()
            + "\n----------------------------------"
            + "\n980$b " + data.precio
            + "\n----------------------------------"
            + "\n980$f " + data.numFact/*"020$a "+data.isbn 
        +"\n----------------------------------"
        +"\n100$a "+name//JSON.stringify(data);
        +"\n----------------------------------"
        +"\n245$a "+data.titulo//JSON.stringify(data);
        +"\n----------------------------------"
        +"\n245$a "+ datasAll
        +"\n----------------------------------"
        */
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "Marc21-" + data.isbn + ".txt";
        link.href = url;
        link.click();
    };

    peticionPut = () => {
        let url = "https://appi-books.herokuapp.com/api/libros/" + this.state.formEdit.isbn;
        axios.put(url + this.state.form.id, this.state.formEdit).then((response) => {
            swal("Libro Editado", { icon: "success", });
            this.modalEditar();
            this.peticionGet();
        }).catch((error) => {
            swal("Error en el sistema", {
                icon: "error",
            });
        });
    };
    peticionEdit = (libro) => {
        let url = "https://appi-books.herokuapp.com/api/libros/" + libro.isbn;
        axios
            .get(url)
            .then((response) => {
                this.setState({ modalEditar: !this.state.modalEditar });
                this.setState({ formEdit: response.data });
            })
            .catch((error) => { });

    }
    peticionDelete = (libro) => {
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
                    url: "https://appi-books.herokuapp.com/api/libros/" + libro.isbn,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers":
                            "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                        "Content-Type": "application/json",
                    },
                };
                axios(config).catch((err) => err);
                let url = "https://appi-books.herokuapp.com/api/libros/" + libro.isbn;
                axios
                    .delete(url)
                    .then((response) => {
                        swal("Libro eliminado correctamente", {
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
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    };
    modalEditar = () => {
        this.setState({ modalEditar: !this.state.modalEditar });
    };
    loadData = () => {
        let config = {
            method: "GET",
            url: "https://appi-books.herokuapp.com/api/libros",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
        };
        axios(config).catch((err) => err);
        let url = "https://appi-books.herokuapp.com/api/libros";
        axios
            .get(url)
            .then((response) => {
                this.setState({ data: response.data });
                config = {
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
                        this.setState({ dataEditorial: response.data });
                    })
                    .catch((error) => { });
            })
            .catch((error) => { });
    };
    seleccionarEmpresa = (empresa) => {
        this.setState({
            tipoModal: "actualizar",
            form: {
                id: empresa.id,
                nombre: empresa.nombre,
                pais: empresa.pais,
                capital_bursatil: empresa.capital_bursatil,
            },
        });
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
            formFilter: {
                ...this.state.formFilter,
                [e.target.name]: e.target.value,
            },
        });
    };
    peticionAvanced = () => {
        let obj = {}
        for (let i in this.state.formFilter) {
            if (this.state.formFilter[i]) {
                obj[i] = this.state.formFilter[i];
            }
        }
        let url = "https://appi-books.herokuapp.com/api/filters/libros";
        axios
            .post(url, obj)
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => {
            });
    }
    updateInputValue = async (e) => {
        this.state.formEdit[e.target.name] = e.target.value;
        e.persist();
        await this.setState({
            formEdit: this.state.formEdit
        });
    };
    componentDidMount() {
        this.loadData();
    }

    render() {

        const headers = [
            { label: "*Unique vendor identifier", key: "Uniquevendoridentifier" },
            { label: "*Author", key: "Author" },
            { label: "*Title", key: "Title" },
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

        ];

        let data = [
            {
                Uniquevendoridentifier: "MARC 001, 035",
                Author: "100$a",
                Title: "245$a",
                ISBNhardcover: "20$a",
                ISBNpaperback: "20$a",
                Placeofpublication: "260$a",
                Publisher: "260$b",
                Dateofpublication: "260$c",
                Physicaldescription: "300",
                Language: "",
                ma: "980$a",
                US: "980$b",
                USshipping: "980$c",
                Netamount: "980$e",
                Invoicenumber: "980$f",
                Numberofcopies: "980$g",
                Vendorcode: "981$a",
                Fundcode: "981$b",
                Location: "981$c"
            }

        ];

        const downloadMARC21 = async (libro) => {
            console.log('aqui')
            console.log(libro)
            let libroObj = {
                Uniquevendoridentifier: 'mjse',
                Author: libro.autor,
                Title: libro.titulo,
                ISBNhardcover: libro.isbn,
                ISBNpaperback: '',
                Placeofpublication: libro.placePub,
                Publisher: libro.editorialName,
                Dateofpublication: libro.anio,
                Physicaldescription: libro.descripcion,
                Language: libro.Language,
                ma: libro.ma,
                US: libro.precio,
                USshipping: '',
                Netamount: libro.precio,
                Invoicenumber: libro.numFact,
                Numberofcopies: libro.Numberofcopies,
                Vendorcode: 'mjse',
                Fundcode: 'mexia',
                Location: 'ma'
            }

            await data.push(libroObj)

            await this.setState({ ...this.state, dataLibros: data })

            console.log(data)

            return (
                <CSVLink data={data} headers={headers} >
                </CSVLink>
            )

        }

        const { form, formFilter } = this.state;

        if (this.state.loading === true && !this.state.data) {
            return <PageLoading />
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-11 rigth">
                            <h2>Alta de Libros</h2>
                        </div>
                        <div className="col-md-6 col-sm-1"></div>

                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>ISBN/ISSN</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="isbn"
                                    id="ISSNFilter"
                                    onChange={this.handleChangeFilter}
                                    value={formFilter ? formFilter.isbn : ""}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Título</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="titulo"
                                    id="TituloLibroFilter"
                                    onChange={this.handleChangeFilter}
                                    value={formFilter ? formFilter.titulo : ""}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Autor</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="autor"
                                    id="AutorFilter"
                                    onChange={this.handleChangeFilter}
                                    value={formFilter ? formFilter.autor : ""}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Editorial</label>
                                <select className="form-control" name="editorial" onChange={this.handleChangeFilter}
                                    value={formFilter ? formFilter.editorial : ""}>
                                    <option value="">Seleccione una opción</option>
                                    {this.state.dataEditorial.map((editorial, i) => {
                                        return (
                                            <option key={i} value={editorial.ideditorial}>
                                                {editorial.editorialName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Año</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="anio"
                                    id="anioFilter"
                                    onChange={this.handleChangeFilter}
                                    value={formFilter ? formFilter.anio : ""}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label>Estado</label>
                                <select className="form-control" name="placePub" onChange={this.handleChangeFilter}
                                    value={formFilter ? formFilter.placePub : ""}>
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
                            <div className="form-group">
                                <label>Palabras Clave</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="palabraClaveFilter"
                                    id="palabraClaveFilter"

                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <button className="btn btn-primary btnTop" onClick={() => this.peticionAvanced()}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <div className="col-md-12 col-sm-12">
                            <table className="table ">
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
                                    {this.state.data.map((libro, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{libro.autor}</td>
                                                <td>{libro.titulo}</td>
                                                <td>{libro.editorialName}</td>
                                                <td>{libro.isbn}</td>
                                                <td>{libro.anio}</td>
                                                <td>
                                                    {/*TODO:*/}
                                                    <CSVLink data={this.state.dataLibros} headers={headers} >
                                                        <button className="btn btn-primary" onClick={() => { downloadMARC21(libro) }}>
                                                            <FontAwesomeIcon icon={faDownload} />
                                                        </button>
                                                    </CSVLink>

                                                    {/* FIXME:*/}
                                                    <button
                                                        className="btn btn-warning text-white"
                                                        onClick={() => { this.peticionEdit(libro); }}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => { this.peticionDelete(libro); }}>
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

                <Modal isOpen={this.state.modalInsertar} className="modal-xl">
                    <ModalHeader style={{ display: "block" }}>
                        Nuevo Libro
                        <span
                            style={{ float: "right" }}
                            onClick={() => this.modalInsertar()}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            {/*<div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Identificador único de proveedor</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="idProv"
                                        id="idProv"
                                        onChange={this.handleChange}
                                        value={form ? form.idProv : ""}
                                    />
                                </div>
                        </div>*/}
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Autor</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="autor"
                                        id="autor"
                                        onChange={this.handleChange}
                                        value={form ? form.autor : ""}
                                    />
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Título</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="titulo"
                                        id="titulo"
                                        onChange={this.handleChange}
                                        value={form ? form.titulo : ""}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Editorial</label>
                                    <select
                                        className="form-control"
                                        name="editorial"
                                        id="editorial"
                                        onChange={this.handleChange}
                                        value={form ? form.editorial : ""}
                                    >
                                        <option value="">Seleccione una opción</option>
                                        {this.state.dataEditorial.map((editorial, i) => {
                                            return (
                                                <option key={i} value={editorial.ideditorial}>
                                                    {editorial.editorialName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">ISBN/ISSN</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="isbn"
                                        id="isbn"
                                        onChange={this.handleChange}
                                        value={form ? form.isbn : ""}
                                    />
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

                <Modal isOpen={this.state.modalEditar} className="modal-xl">
                    <ModalHeader style={{ display: "block" }}>
                        Editar Libro
                        <span
                            style={{ float: "right" }}
                            onClick={() => this.modalEditar()}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </ModalHeader>

                    <ModalBody>
                        <div className="row">

                            {/*<div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Identificador único de proveedor</label>
                                    <input className="form-control" type="text" name="idProv" onChange={this.updateInputValue}
                                        id="idProvEdit" value={this.state.formEdit.idProv} />
                                </div>
                            </div>*/}

                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Autor</label>
                                    <input className="form-control" type="text" name="autor" onChange={this.updateInputValue}
                                        id="autor" value={this.state.formEdit.autor} />
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Título</label>
                                    <input className="form-control" type="text" name="titulo" onChange={this.updateInputValue}
                                        id="tituloEdit" value={this.state.formEdit.titulo} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Editorial</label>
                                    <select className="form-control" name="editorial" onChange={this.updateInputValue}
                                        id="editorialEdit" value={this.state.formEdit.editorial} >
                                        <option value="">Seleccione una opción</option>
                                        {this.state.dataEditorial.map((editorial, i) => {
                                            return (
                                                <option key={i} value={editorial.ideditorial}>
                                                    {editorial.editorialName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">ISBN/ISSN</label>
                                    <input className="form-control" type="text" name="isbn" onChange={this.updateInputValue}
                                        id="isbnEdit" value={this.state.formEdit.isbn} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Lugar de publicación</label>
                                    <select className="form-control" name="placePub" id="placePubEdit" onChange={this.updateInputValue} value={this.state.formEdit.placePub}>
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
                                    {/*<input className="form-control" type="text" name="placePub" onChange={this.updateInputValue}
                                    id="placePubEdit" value={this.state.formEdit.placePub} />*/}
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Coordinadores / Antalogadores / Compiladores</label>
                                    <textarea className="form-control" type="text" onChange={this.updateInputValue}
                                        name="coordinadores" id="coordinadoresEdit" value={this.state.formEdit.coordinadores} />
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Año de publicación</label>
                                    <input className="form-control" type="number" name="anio" onChange={this.updateInputValue}
                                        id="anio" value={this.state.formEdit.anio} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Fecha</label>
                                    <input className="form-control" type="date" name="fecha" onChange={this.updateInputValue}
                                        id="fechaEdit" value={this.state.formEdit.fecha} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Precio</label>
                                    <input className="form-control" type="number" name="precio" onChange={this.updateInputValue}
                                        id="precioEdit" value={this.state.formEdit.precio} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre"># Factura</label>
                                    <input className="form-control" type="number" onChange={this.updateInputValue}
                                        name="numFact" id="numFactEdit" value={this.state.formEdit.numFact} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre"># Copias</label>
                                    <input className="form-control" type="number" onChange={this.updateInputValue}
                                        name="numCopias" id="numCopyEdit" value={this.state.formEdit.numCopias} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre"># Páginas</label>
                                    <input className="form-control" type="number" onChange={this.updateInputValue}
                                        name="paginas" id="numPagEdit" value={this.state.formEdit.paginas} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Dimensiones</label>
                                    <input className="form-control" type="number" onChange={this.updateInputValue}
                                        name="dimensiones" id="dimensionesEdit" value={this.state.formEdit.dimensiones} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Colección / Serie</label>
                                    <input className="form-control" type="text" onChange={this.updateInputValue}
                                        name="coleccionSerie" id="coleccionSerieEdit" value={this.state.formEdit.coleccionSerie} />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="nombre">Tema</label>
                                    <input className="form-control" type="text" onChange={this.updateInputValue}
                                        name="tema" id="temaEdit" value={this.state.formEdit.tema} />
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nota bibliográfica</label>
                                    <textarea className="form-control" name="nota" id="notaEdit"
                                        value={this.state.formEdit.nota} onChange={this.updateInputValue} rows="3" />
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="nombre">Descripción</label>
                                    <textarea className="form-control" name="descripcion" id="descripcionEdit"
                                        value={this.state.formEdit.descripcion} onChange={this.updateInputValue} rows="3" />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            onClick={() => this.peticionPut()}
                            className="btn btn-primary"
                        >
                            Guardar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.modalEditar()}
                        >
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default AltaLibros;