import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";


class ClientsContent extends React.Component {

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

    render() {
        const formFilter = this.state.formFilter;
        const cotizacion = this.state.data;
        const functionFetchData = this.props.cotizacion.fetchDataCotizaciones

        return (
            <Fragment>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Id factura</label>
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
                <div className="col-xs-12 col-md-12 mt-2">
                    <FacturaTable cotizacion={cotizacion} functionFetchData={functionFetchData} />
                </div>
            </Fragment>
        );
    }
}


class FacturaTable extends React.Component {

    state = {
        dataClientes: [],
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

    peticionPutFactura = async (cotizacion) => {

        const url = "https://appi-books.herokuapp.com/api/factura/" + cotizacion.id_cotizacion;
        let config = {
            method: "PUT",
            url: url,
            headers: {
                'Authorization': 'Bearer '+sessionStorage.is_security,
                "Content-Type": "application/json",
            }
        };

        this.setState({ loading: true, error: null });

        await axios(config).then((response) => {
            swal("Se genero la factura #" + response.data.factura, {
                icon: "success",
            })
            this.props.functionFetchData();

        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }

    render() {

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
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

function FacturasM(props) {

    return (
        <Fragment>
            <ClientsContent cotizacion={props} />
        </Fragment>
    );
}

export default FacturasM