import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faTrashAlt, faSearch, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import ModalEditarCotizacion from "../modals/cotizaciones/editCotizacion";

class CotizacionContent extends React.Component {

    state = {
        formFilter: {},
        data: this.props.cotizacion.cotizacion
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
            url: 'https://appi-books.herokuapp.com/api/filters/cotizacion',
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
        const cotizacion = this.state.data;
        const functionFetchDataCotizaciones = this.props.cotizacion.fetchDataCotizaciones;
        const functionFetchDataClientes = this.props.cotizacion.fetchDataClientes;
        const functionFetchDataLibros = this.props.cotizacion.fetchDataLibros;
        const dataCliente = this.props.cotizacion.clientes;
        const dataLibro = this.props.cotizacion.libros;

        return (
            <Fragment>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Id Cotización</label>
                        <input
                            className="form-control mt-2"
                            type="text"
                            value={formFilter ? formFilter.id_cotizacion : ""}
                            name="id_cotizacion"
                            id="id_cotizacion"
                            onChange={this.handleChangeFilter}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-3 mt-3">
                    <button className="btn btn-primary btnTop" onClick={() => this.peticionAvanced()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className="col-xs-12 col-md-12 mt-2">
                    <CotizacionTable
                        cotizacion={cotizacion}
                        functionFetchDataCotizaciones={functionFetchDataCotizaciones}
                        functionFetchDataClientes={functionFetchDataClientes}
                        functionFetchDataLibros={functionFetchDataLibros}
                        dataCliente={dataCliente}
                        dataLibro={dataLibro}
                    />
                </div>
            </Fragment>
        );
    }
}


class CotizacionTable extends React.Component {

    state = {
        dataCotizacion: [],
        modalEditar: false,
        formEdit: undefined,
        triggerEditModal: false,
        dataLibros: [],
    };

    handleCloseModal = async () => {
        await this.setState({ triggerEditModal: false, formEdit: undefined })
    }

    handleOpenModal = e => {
        this.setState({ triggerEditModal: true });
    };
    peticionDelete = async (cotizacion) => {
        console.log(cotizacion)
        swal({
            title: "Deseas eliminar la cotización " + cotizacion.id_cotizacion + "?",
            text: "No podra recuperar la información",
            icon: "warning",
            buttons: ["Cancelar", "Si, eliminar"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let config = {
                    method: "DELETE",
                    url: "https://appi-books.herokuapp.com/api/cotizaciones/" + cotizacion.id_cotizacion,
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.is_security,
                        "Content-Type": "application/json",
                    },
                }
                axios(config)
                    .then((response) => {
                        swal("Perfil eliminado correctamente", {
                            icon: "success",
                        });
                        this.props.functionFetchDataCotizaciones();
                        this.props.functionFetchDataClientes();
                        this.props.functionFetchDataLibros();
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

    peticionPutFactura = async (cotizacion) => {

        const url = "https://appi-books.herokuapp.com/api/factura/" + cotizacion.id_cotizacion;
        let config = {
            method: "PUT",
            url: url,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.is_security,
                "Content-Type": "application/json",
            }
        };

        this.setState({ loading: true, error: null });

        await axios(config).then((response) => {
            swal("Se genero la factura #" + response.data.factura, {
                icon: "success",
            })
            this.props.functionFetchDataCotizaciones();
            this.props.functionFetchDataClientes();
            this.props.functionFetchDataLibros();

        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }

    render() {

        const peticionEdit = async (cotizacion) => {
            let url = "https://appi-books.herokuapp.com/api/cotizaciones/" + cotizacion.id_cotizacion
            let config = {
                method: "GET",
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.is_security,
                    "Content-Type": "application/json",
                },
            };
            await axios(config).then((response) => {
                this.setState({ triggerEditModal: !this.state.triggerEditModal, formEdit: response.data.body });
            }).catch((error) => {
                return error
            });
        }

        const functionFetchDataCotizaciones = this.props.functionFetchDataCotizaciones;
        const functionFetchDataClientes = this.props.functionFetchDataClientes;
        const functionFetchDataLibros = this.props.functionFetchDataLibros;
        const dataCliente = this.props.dataCliente;
        const dataLibro = this.props.dataLibro;

        return (
            <Fragment>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id Cotización</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>E-mail</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cotizacion.map((cotizacion, i) => {
                            return (
                                <tr key={i}>
                                    <td>{cotizacion.id_cotizacion}</td>
                                    <td>{cotizacion.nombre}</td>
                                    <td>{cotizacion.direccion}</td>
                                    <td>{cotizacion.telefono}</td>
                                    <td>{cotizacion.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary text-white"
                                            onClick={() => { this.peticionPutFactura(cotizacion); }}>
                                            <FontAwesomeIcon icon={faMoneyBill} />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => { this.peticionDelete(cotizacion); }}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                        <Button variant="warning text-white"
                                            onClick={() => { peticionEdit(cotizacion); }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ModalEditarCotizacion
                    onCloseModal={this.handleCloseModal}
                    onOpenModal={this.handleOpenModal}
                    modalIsOpen={this.state.triggerEditModal}
                    data={this.state.formEdit}
                    fetchDataCotizacionesCotizaciones={functionFetchDataCotizaciones}
                    fetchDataCotizacionesClientes={functionFetchDataClientes}
                    fetchDataCotizacionesLibros={functionFetchDataLibros}
                    dataCliente={dataCliente}
                    dataLibro={dataLibro}
                />

            </Fragment>
        );
    }
}

function CotizacionM(props) {

    return (
        <Fragment>
            <CotizacionContent cotizacion={props} />
        </Fragment>
    );
}

export default CotizacionM