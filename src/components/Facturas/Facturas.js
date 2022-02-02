import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { CSVLink } from 'react-csv';
import axios from "axios";
import swal from "sweetalert";


class ClientsContent extends React.Component {

    state = {
        formFilter: {},
        data: this.props.facturas.facturas
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
        const facturas = this.state.data;
        const functionFetchData = this.props.facturas.fetchDataClientes

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
                <div className="col-xs-12 col-md-3 mt-2">
                </div>
                <div className="col-xs-12 col-md-12 mt-2">
                    <FacturaTable facturas={facturas} functionFetchData={functionFetchData} />
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
        dataLibros: [{
            code: "257",
            text: "## $a Mexico"
        },{
            code: "257",
            text: "## $a Mexico"
        }],
    };
    handleCloseModal = async () => {
        await this.setState({ triggerEditModal: false, formEdit: undefined })
    }
    handleOpenModal = e => {
        this.setState({ triggerEditModal: true });
    };
    render() {
        const headers = [
            { label: "Code", key: "code" },
            { label: "*Text", key: "text" }
        ];
        var data = [{
            code: "257",
            text: "## $a Mexico"
        },{
            code: "257",
            text: "## $a Mexico"
        }]
        const peticionEdit = async (libro) => {
            console.log(libro)
            const url = "https://appi-books.herokuapp.com/api/facturas/" + libro.id_cotizacion;
            let config = {
                method: "GET",
                url: url,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers":
                        "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                    "Content-Type": "application/json",
                },
            };
            axios(config).catch((err) => err);
            this.setState({ loading: true, error: null });
            await axios.get(url).then((response) => {
               // var data = [];
                for (let i = 0; i < response.data.length; i++) {
                    let libro = response.data[i]
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
                    break;
                }
                this.setState({ ...this.state, dataLibros: data })
                console.log(data)
                return (
                    <CSVLink data={data} >
                    </CSVLink>
                )
            }).catch((error) => {
                this.setState({ loading: false, error: error });
            });
        }

        const functionFetchData = this.props.functionFetchData;
        return (
            <Fragment>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id Factura</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>E-mail</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.facturas.map((factura, i) => {
                            return (
                                <tr key={i}>
                                    <td>{factura.idFactura}</td>
                                    <td>{factura.nombre}</td>
                                    <td>{factura.direccion}</td>
                                    <td>{factura.telefono}</td>
                                    <td>{factura.email}</td>
                                    <td>
                                        <CSVLink data={this.state.dataLibros} headers={headers} filename={'MARC21-' + factura.idFactura + '.csv'}>
                                            <button
                                                className="btn btn-primary text-white"
                                                onClick={() => { peticionEdit(factura); }}>
                                                <FontAwesomeIcon icon={faDownload} />
                                            </button>
                                        </CSVLink>
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
            <ClientsContent facturas={props} />
        </Fragment>
    );
}

export default FacturasM