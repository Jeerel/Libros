import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faTrashAlt, faSearch, faEdit, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import ModalEditarCotizacion from "../modals/cotizaciones/editCotizacion";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
        
        let dataSetArray = [];

        const mostrarBoton = (factura) => {
            var libros = factura.libros
            let nameExcel = "Factura" + factura.id_cotizacion
            for (let i = 0; i < libros.length; i++) {
                let libro=libros[i]
                let infoMarc = [
                    {
                        columns: [
                            { title: "Code", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                            { title: "*Text", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }
                        ],
                        data: [
                            ['001', '$a MJS'], // 0
                            ['020', '$a '], //1 ISBN
                            ['022', '$a '], //2 ISSN
                            ['035', '$a MJS'], //3
                            ['041', '$a spa'], //4
                            ['044', '$a mx'], //5
                            ['100', '$a '], //6 AUTOR
                            ['245', '$a '], //7 TITULO
                            ['260', '$a '], //8 CADENA DE TEXTO
                            ['300', '$a '], //9 DESCRIP FISICA
                            ['362', ''], //10 ANIO PUBLICACION
                            ['500', '$a '], //11 NOTA GENERAL
                            ['980', ''] //12 FACTURA FECHA ANIO MES DIA
                        ]
                    }
                ]

                
                infoMarc[0].data[1][1] = libro.isbn ? infoMarc[0].data[1][1] + libro.isbn : '';

                infoMarc[0].data[2][1] = libro.issn ? infoMarc[0].data[2][1] + libro.issn : '';

                infoMarc[0].data[6][1] = libro.autor ? infoMarc[0].data[6][1] + libro.autor : '';

                infoMarc[0].data[7][1] = libro.titulo ? infoMarc[0].data[7][1] + libro.titulo : '';

                let pub = libro.placePub ? "$a " + libro.placePub + ' ' : '';
                pub = libro.editorial ? pub + "$b" + libro.editorial + ' ' : pub;
                pub = libro.anio ? pub + '$c ' + libro.anio + ' ' : pub;
                infoMarc[0].data[8][1] = pub ? pub : '';
                infoMarc[0].data[9][1] = libro.descripcion ? infoMarc[0].data[9][1] + libro.descripcion : '';
                infoMarc[0].data[10][1] = libro.anio ? infoMarc[0].data[10][1] + libro.anio : '';
                infoMarc[0].data[11][1] = libro.nota ? infoMarc[0].data[11][1] + libro.nota : '';
                infoMarc[0].data[12][1] = '$a ' + libro.fecha_cotizacion + ' $b ' + libro.precio + " $e " + libro.precio + " $f " + libro.id_cotizacion;
                dataSetArray.push(infoMarc) // DataSet[1]
            }

            return (
                <Fragment>
                    <ExcelFile filename={nameExcel} element={<Button variant="success"><FontAwesomeIcon icon={faFileExcel} /></Button>}>
                        {libros.map((libro, i) => {
                            return (
                                <ExcelSheet dataSet={dataSetArray[i]} name={libro.titulo}></ExcelSheet>
                            )
                        })}
                    </ExcelFile>
                </Fragment>
            )
        }

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
                            <th>Id factura</th>
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
                                        {
                                            mostrarBoton(cotizacion)
                                        }
                                        
                                        <Button variant="warning text-white"
                                            onClick={() => { peticionEdit(cotizacion); }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => { this.peticionDelete(cotizacion); }}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
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