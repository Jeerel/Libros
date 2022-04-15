import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, FloatingLabel, Form, Col } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import ModalEditLibro from "../modals/libros/editBook";

function BooksContent(props) {

    //asignacion de constantes, variables, y estados
    const [libros, setLibros] = useState([]);
    const [tablaLibros, setTablaLibros] = useState([]);
    const [filtroISBN_ISSN, setFiltroISBN_ISSN] = useState("");
    const [filtroTitulo, setFiltroTitulo] = useState("");
    const [filtroAutor, setFiltroAutor] = useState("");
    const [filtroEditorial, setFiltroEditorial] = useState("");
    const [filtroAnio, setFiltroAnio] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [filtroGeneral, setFiltroGeneral] = useState("");
    const functionFetchData = props.libros.fetchDataLibros

    const getContent = async () => {
        setLibros(props.libros.libros);
        setTablaLibros(props.libros.libros);
    }

    //funciones de filtrado

    //Funcion de filtrado para el campo isbn e issn
    const handleChangeFilterISBN_ISSN = async (e) => {

        e.persist();


        setFiltroISBN_ISSN(e.target.value);

        filtrarISBN_ISSN(e);

    }
    //fin de funcion de filtrado de isbn e issn

    //funcion que filtrara de acuerdo a ciertas validaciones
    const filtrarISBN_ISSN = (e) => {
        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaLibros.filter((libro) => {
            //validamos que tenga isbn o issn
            if (libro.isbn || libro.issn) {
                let hasISBN = libro.isbn ? true : false;
                let hasISSN = libro.issn ? true : false;

                if (hasISBN && hasISSN) { // caso que tenga isbn e issn
                    if (
                        libro.issn.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) ||
                        libro.isbn.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())
                    ) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return libro //si lo contiene lo regresamos
                    }
                } else if (hasISBN && !hasISSN) { //caso que tenga isbn y no issn
                    if (libro.isbn.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) {
                        //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return libro //si lo contiene lo regresamos
                    }
                } else if (!hasISBN && hasISSN) { //caso que no contenga isbn y contenga issn
                    if (libro.issn.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) {
                        //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return libro //si lo contiene lo regresamos
                    }
                }

            }
        });

        setLibros(arrayFiltrado);
    }
    //fin de la funcion filtrarISBN_ISSN

    //Funcion de filtrado para el campo titulo
    const handleChangeFilterTitulo = async (e) => {

        e.persist();

        setFiltroTitulo(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaLibros.filter((libro) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            if (libro.titulo.toString().toLowerCase().includes(e.target.value.toLowerCase())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return libro //si lo contiene lo regresamos
            }
        });

        setLibros(arrayFiltrado);

    }
    //fin de funcion de filtrado de titulo

    //Funcion de filtrado para el campo autor
    const handleChangeFilterAutor = async (e) => {

        e.persist();

        setFiltroAutor(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaLibros.filter((libro) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            if (libro.autor.toString().toLowerCase().includes(e.target.value.toLowerCase())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return libro //si lo contiene lo regresamos
            }
        });

        setLibros(arrayFiltrado);

    }
    //fin de funcion de filtrado de autor

    //Funcion de filtrado para el campo editorial
    const handleChangeFilterEditorial = async (e) => {

        e.persist();

        setFiltroEditorial(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaLibros.filter((libro) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            if (libro.editorial.toString().toLowerCase().includes(e.target.value.toLowerCase())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return libro //si lo contiene lo regresamos
            }
        });

        setLibros(arrayFiltrado);

    }
    //fin de funcion de filtrado de editorial

    //Funcion de filtrado para el campo año
    const handleChangeFilterAnio = async (e) => {

        e.persist();

        setFiltroAnio(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaLibros.filter((libro) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            //validacion de que tenga año el libro
            if (libro.anio) {
                if (libro.anio.toString().includes(e.target.value.toString())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                    return libro //si lo contiene lo regresamos
                }
            }
        });

        setLibros(arrayFiltrado);

    }
    //fin de funcion de filtrado de año

    //Funcion de filtrado para el campo estado
    const handleChangeFilterEstado = async (e) => {

        e.persist();

        setFiltroEstado(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaLibros.filter((libro) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            //validamos que contenga estado
            if (libro.estado) {
                if (libro.estado.toString().toLowerCase().includes(e.target.value.toLowerCase())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                    return libro //si lo contiene lo regresamos
                }
            }
        });

        setLibros(arrayFiltrado);

    }
    //fin de funcion de filtrado de estado

    //Funcion de filtrado para el campo general
    const handleChangeFilterGeneral = async (e) => {

        e.persist();

        setFiltroGeneral(e.target.value);

        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaLibros.filter((libro) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            //iteramos el objeto libro
            for (let propiedad in libro) {
                if (libro[propiedad]) {
                    if (libro[propiedad].toString().toLowerCase().includes(e.target.value.toLowerCase())) {
                        return libro
                    }
                }
            }
        });

        setLibros(arrayFiltrado);

    }
    //fin de funcion de filtrado de general

    useEffect(() => {
        getContent();
    }, []);

    return (
        <Fragment>
            <Col xs={12} md={3} className="mt-2">

                <FloatingLabel
                    controlId="floatingInput"
                    label="ISBN / ISSN">
                    <Form.Control
                        type="text"
                        placeholder="ISBN / ISSN"
                        value={filtroISBN_ISSN}
                        name="isbn"
                        onChange={handleChangeFilterISBN_ISSN} />
                </FloatingLabel>
            </Col>
            <Col xs={12} md={3} className="mt-2">

                <FloatingLabel
                    controlId="floatingInput"
                    label="Título">
                    <Form.Control
                        type="text"
                        placeholder="Título"
                        value={filtroTitulo}
                        name="titulo"
                        onChange={handleChangeFilterTitulo} />
                </FloatingLabel>
            </Col>
            <Col xs={12} md={3} className="mt-2">

                <FloatingLabel
                    controlId="floatingInput"
                    label="Autor">
                    <Form.Control
                        type="text"
                        placeholder="Autor"
                        value={filtroAutor}
                        name="autor"
                        onChange={handleChangeFilterAutor} />
                </FloatingLabel>

            </Col>
            <Col xs={12} md={3} className="mt-2">

                <FloatingLabel
                    controlId="floatingInput"
                    label="Editorial">
                    <Form.Control
                        type="text"
                        placeholder="Editorial"
                        value={filtroEditorial}
                        name="editorial"
                        onChange={handleChangeFilterEditorial} />
                </FloatingLabel>

            </Col>
            <Col xs={12} md={3} className="mt-2">

                <FloatingLabel
                    controlId="floatingInput"
                    label="Año">
                    <Form.Control
                        type="number"
                        placeholder="Año"
                        value={filtroAnio}
                        name="anio"
                        onChange={handleChangeFilterAnio} />
                </FloatingLabel>

            </Col>

            <Col xs={12} md={3} className="mt-2">
                <FloatingLabel
                    controlId="floatingSelect"
                    label="Lugar de publicación">
                    <Form.Select aria-label="Floating label" value={filtroEstado} onChange={handleChangeFilterEstado} name="estado">
                        <option selected value="">Seleccione una opción</option>
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
                    </Form.Select>
                </FloatingLabel>
            </Col>

            <Col xs={12} md={3} className="mt-2">

                <FloatingLabel
                    controlId="floatingInput"
                    label="Palabra Clave">
                    <Form.Control
                        type="text"
                        placeholder="Palabra Clave"
                        value={filtroGeneral}
                        name="general"
                        onChange={handleChangeFilterGeneral} />
                </FloatingLabel>

            </Col>
            <div className="col-xs-12 col-md-12 mt-5">
                <BookTable libros={libros} functionFetchData={functionFetchData} />

            </div>
        </Fragment>
    )

}

/*
class BooksContent extends React.Component {

    state = {
        formFilter: {},
        formFilterISBN_ISSN: {},
        formFilterTitulo: {},
        formFilterAutor: {},
        formFilterEditorial: {},
        formFilterAnio: {},
        formFilterEstado: {},
        formFilterGeneral: {},
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


    render() {

        const formFilter = this.state.formFilter;
        const formFilterISBN_ISSN = this.state.formFilterISBN_ISSN;
        const formFilterTitulo = this.state.formFilterTitulo;
        const formFilterAutor = this.state.formFilterAutor;
        const formFilterEditorial = this.state.formFilterEditorial;
        const formFilterAnio = this.state.formFilterAnio;
        const formFilterEstado = this.state.formFilterEstado;
        const formFilterGeneral = this.state.formFilterGeneral;
        let libros = this.state.data;
        const functionFetchData = this.props.libros.fetchDataLibros


        //funciones de filtrado

        //Funcion de filtrado para el campo titulo
        let handleChangeFilterTitulo = async (e) => {

            e.persist();

            //cambiamos en el estado del formfiltertitulo dependiendo de lo que reciba en el input
            await this.setState({
                formFilterTitulo: {
                    ...this.state.formFilterTitulo,
                    [e.target.name]: e.target.value,
                },
            });

            //asignamos a una variable el contenido del input
            let filterField = this.state.formFilterTitulo.titulo

            //asignamos a una variable array lo que regrese la funcion filter
            let arrayFiltrado = this.state.data.filter((libro) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (libro.titulo.toString().toLowerCase().includes(filterField)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                    return libro //si lo contiene lo regresamos
                }
            })

            this.setState({
                data: arrayFiltrado
            })

        }
        //fin de funcion de filtrado de titulo

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
                                value={formFilterTitulo ? formFilterTitulo.titulo : ""}
                                name="titulo"
                                onChange={handleChangeFilterTitulo} required />
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
*/

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