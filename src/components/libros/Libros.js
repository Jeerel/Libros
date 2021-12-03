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
        dataEditoriales: this.props.libros.editoriales
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

    peticionAvanced = () => {

        let obj = {}
        for (let i in this.state.formFilter) {
            if (this.state.formFilter[i]) {
                obj[i] = this.state.formFilter[i];
            }
        }
        let url = "https://appi-books.herokuapp.com/api/filters/libros";
        axios.post(url, obj).then((response) => {
            this.setState({ data: response.data });
        }).catch((error) => {
            return error;
        });
    }

    render() {

        const formFilter = this.state.formFilter;
        const libros = this.state.data;
        const editoriales = this.state.dataEditoriales;
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
                    <BookTable libros={libros} editoriales={editoriales} functionFetchData={functionFetchData} />
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

    handleCloseModal = (event) => {
        event.preventDefault();
        this.setState({ triggerEditModal: false })
    }

    handleCloseModalx = e => {
        this.setState({ triggerEditModal: false })
    }

    handleOpenModal = e => {
        this.setState({ triggerEditModal: true });
    };

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
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers":
                                "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                            "Content-Type": "application/json",
                        },
                    };
                    axios(config).catch((err) => err);
                    let url = "https://appi-books.herokuapp.com/api/libros/" + libro.idLibro;
                    axios
                        .delete(url)
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
            await axios.get(url).then((response) => {
                this.setState({ triggerEditModal: !this.state.triggerEditModal, formEdit: response.data });
            }).catch((error) => {
                return error
            });
        }

        const downloadMARC21 = async (libro) => {

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

            return (
                <CSVLink data={data} headers={headers} >
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
                                <td>{libro.editorialName}</td>
                                <td>{libro.isbn}</td>
                                <td>{libro.anio}</td>
                                <td>
                                    <CSVLink data={this.state.dataLibros} headers={headers} >
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
                    onCloseModalx={this.handleCloseModalx}
                    onCloseModal={this.handleCloseModal}
                    onOpenModal={this.handleOpenModal}
                    modalIsOpen={this.state.triggerEditModal}
                    editoriales={this.props.editoriales}
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