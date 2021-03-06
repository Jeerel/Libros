import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt,faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, FloatingLabel, Form, Col } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import ModalEditarPerfil from "../modals/perfiles/editPerfil";
function PerfilesContenidos (props){
//asignacion de constantes, variables, y estados
const [perfiles, setPerfiles] = useState([]);
const [tablaPerfiles, setTablaPerfiles] = useState([]);
const [filtroNombre, setFiltroNombre] = useState("");
const [filtroCorreo, setFiltroCorreo] = useState("");
const [filtroTipo, setFiltroTipo] = useState("");
const functionFetchData = props.perfiles.fetchDataPerfiles
console.log("props.perfiles.perfiles")
console.log(props.perfiles.perfiles)
const getContent = async () => {
    setPerfiles(props.perfiles.perfiles);
    setTablaPerfiles(props.perfiles.perfiles);
}

//Funcion de filtrado para el campo nombre
const handleChangeNombre = async (e) => {
    e.persist();
    setFiltroNombre(e.target.value);
    filtrarNombre(e);
}
//funcion que filtrara de acuerdo a ciertas validaciones
const filtrarNombre = (e) => {
    //asignamos a una variable array lo que regrese la funcion filter
    let arrayFiltrado = tablaPerfiles.filter((libro) => {
        //como la funcion filter tiene su callback, generamos una funcion dentro de filter
        //validacion de que tenga año el libro
        if (libro.nombre) {
            if (libro.nombre.toString().includes(e.target.value.toString())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return libro //si lo contiene lo regresamos
            }
        }
    });

    setPerfiles(arrayFiltrado);
}
//fin de la funcion filtrarISBN_ISSN

//Funcion de filtrado para el campo nombre
const handleChangeCorreo = async (e) => {
    e.persist();
    setFiltroCorreo(e.target.value);
    filtrarCorreo(e);
}
//funcion que filtrara de acuerdo a ciertas validaciones
const filtrarCorreo = (e) => {
    //asignamos a una variable array lo que regrese la funcion filter
    let arrayFiltrado = tablaPerfiles.filter((libro) => {
        //como la funcion filter tiene su callback, generamos una funcion dentro de filter
        //validacion de que tenga año el libro
        if (libro.correo) {
            if (libro.correo.toString().includes(e.target.value.toString())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return libro //si lo contiene lo regresamos
            }
        }
    });

    setPerfiles(arrayFiltrado);
}
//fin de la funcion filtrarISBN_ISSN

//Funcion de filtrado para el campo nombre
const handleChangeTipo = async (e) => {
    e.persist();
    setFiltroTipo(e.target.value);
    filtrarTipo(e);
}
//funcion que filtrara de acuerdo a ciertas validaciones
const filtrarTipo = (e) => {
    //asignamos a una variable array lo que regrese la funcion filter
    let arrayFiltrado = tablaPerfiles.filter((libro) => {
        //como la funcion filter tiene su callback, generamos una funcion dentro de filter
        //validacion de que tenga año el libro
        if (libro.tipo) {
            if (libro.tipo.toString().includes(e.target.value.toString())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                return libro //si lo contiene lo regresamos
            }
        }
    });

    setPerfiles(arrayFiltrado);
}
//fin de la funcion filtrarISBN_ISSN



console.log("perfiles")
console.log(perfiles)
useEffect(() => {
    getContent();
}, []);

return (

    <Fragment>
        <Col xs={12} md={3} className="mt-2">
            <FloatingLabel
                controlId="floatingInput"
                label="Nombre">
                <Form.Control
                    type="text"
                    placeholder="Nombre"
                    value={filtroNombre}
                    name="nombrePerfil"
                    onChange={handleChangeNombre}  />
            </FloatingLabel>
        </Col>
        <Col xs={12} md={3} className="mt-2">
            <FloatingLabel
                controlId="floatingInput"
                label="Correo">
                <Form.Control
                    type="text"
                    placeholder="Correo"
                    value={filtroCorreo}
                    name="correoPerfil" 
                    onChange={handleChangeCorreo} />
            </FloatingLabel>
        </Col>
        <Col xs={12} md={3} className="mt-2">
                <FloatingLabel
                    controlId="floatingSelect"
                    label="Tipo">
                    <Form.Select aria-label="Floating label" value={filtroTipo} onChange={handleChangeTipo} name="estado">
                        <option selected value="">Seleccione una opción</option>
                        <option value="Administrador">Administrador</option>
                            <option value="Usuario">Usuario</option>
                            <option value="Invitado">Invitado</option>
                    </Form.Select>
                </FloatingLabel>
            </Col>
        <div className="col-xs-12 col-md-12 mt-5">
        <PerfilesTable perfiles={perfiles} functionFetchData={functionFetchData} />
        </div>
    </Fragment>
)

}/* 
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

    peticionAvanced = async (event) => {
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
            url: 'https://appi-books.herokuapp.com/api/filters/users',
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
        const perfiles = this.state.data;
        console.log("this.props")
        console.log(this.props)
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
                <div className="col-xs-12 col-md-1 mt-3">
                    <Button variant="btn btn-primary btnTop" onClick={() => this.peticionAvanced()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </div>
                <div className="col-xs-12 col-md-12 mt-2">
                    <PerfilesTable perfiles={perfiles} functionFetchData={functionFetchData} />
                </div>
            </Fragment>
        )

    }

} */

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
                            'Authorization': 'Bearer '+sessionStorage.is_security,
                            "Content-Type": "application/json",
                        },
                    }
                    axios(config)
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
            let config = {
                method: "GET",
                url: url,
                headers: {
                    'Authorization': 'Bearer '+sessionStorage.is_security,
                    "Content-Type": "application/json",
                },
            };
            await axios(config).then((response) => {
                this.setState({ triggerEditModal: !this.state.triggerEditModal, formEdit: response.data.body });
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
                                        <Button
                                            variant="btn btn-warning text-white"
                                            onClick={() => { peticionEdit(perfil); }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button
                                            variant="btn btn-danger btn-xs"
                                            onClick={() => { peticionDelete(perfil); }}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
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
            <PerfilesContenidos perfiles={props} />
        </Fragment>
    )

}

export default PerfilesM;
