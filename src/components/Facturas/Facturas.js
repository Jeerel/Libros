import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSearch, faFileExcel, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class FacturasContent extends React.Component {

    state = {
        formFilter: {},
        data: this.props.facturas.factura
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
        const factura = this.state.data;
        const functionFetchDataFacturas = this.props.facturas.fetchDataFacturas;
        const functionFetchDataClientes = this.props.facturas.fetchDataClientes;
        const functionFetchDataLibros = this.props.facturas.fetchDataLibros;
        const dataCliente = this.props.facturas.clientes;
        const dataLibro = this.props.facturas.libros;

        return (
            <Fragment>
                <div className="col-xs-12 col-md-3 mt-2">
                    <div className="form-group">
                        <label>Factura ID</label>
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
                    <FacturaTable
                        factura={factura}
                        functionFetchDataFacturas={functionFetchDataFacturas}
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


class FacturaTable extends React.Component {

    state = {
        dataFactura: [],
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
    peticionDelete = async (factura) => {
        console.log(factura)
        swal({
            title: "Deseas eliminar la factura " + factura.id_cotizacion + "?",
            text: "No podra recuperar la información",
            icon: "warning",
            buttons: ["Cancelar", "Si, eliminar"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let config = {
                    method: "DELETE",
                    url: "https://appi-books.herokuapp.com/api/cotizaciones/" + factura.id_cotizacion,
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.is_security,
                        "Content-Type": "application/json",
                    },
                }
                axios(config)
                    .then((response) => {
                        swal("Perfil eliminado correctamente", {
                            icon: "success",
                        }).then(() => {
                            this.props.functionFetchDataClientes();
                            this.props.functionFetchDataLibros();
                            this.props.functionFetchDataFacturas();
                        })
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

    peticionPutFactura = async (factura) => {

        const url = "https://appi-books.herokuapp.com/api/factura/" + factura.id_cotizacion;
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
            this.props.functionFetchDataFactura();
            this.props.functionFetchDataClientes();
            this.props.functionFetchDataLibros();

        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }

    render() {

        let dataSetArray = [];

        const getMarcTxt = async (factura) => {

            let libros = factura.libros;
            let nameTxt = "Factura " + factura.id_cotizacion;
            let contenidoMarc = "";

            console.log('tamaño de libros: ', libros.length)

            for (let i = 0; i < libros.length; i++) {
                let libro = libros[i];

                let dataMarc = [
                    ['=001  $a MJS '], // 0
                    ['\n=020  \\\\$a '], //1 ISBN
                    ['\n=022  $a '], //2 ISSN
                    ['\n=035  $a MJS '], //3
                    ['\n=041  0\$a spa '], //4
                    ['\n=044  \\\\$a mx'], //5
                    ['\n=100  1\$a '], //6 AUTOR
                    ['\n=245  10$a '], //7 TITULO
                    ['\n=260  \\\\$a '], //8 CADENA DE TEXTO
                    ['\n=300  \\\\$a '], //9 DESCRIP FISICA
                    ['\n=362  '], //10 ANIO PUBLICACION
                    ['\n=500  $a '], //11 NOTA GENERAL
                    ['\n=980  '] //12 FACTURA FECHA ANIO MES DIA
                ]

                dataMarc[1] = libro.isbn ? dataMarc[1] + libro.isbn : dataMarc[1] + '';

                dataMarc[2] = libro.issn ? dataMarc[2] + libro.issn : dataMarc[2] + '';

                dataMarc[6] = libro.autor ? dataMarc[6] + libro.autor : dataMarc[6] + '';

                dataMarc[7] = libro.titulo ? dataMarc[7] + libro.titulo : dataMarc[7] + '';

                let pub = libro.placePub ? "$a " + libro.placePub + ' ' : '';
                pub = libro.editorial ? pub + "$b" + libro.editorial + ' ' : pub;
                pub = libro.anio ? pub + '$c ' + libro.anio + ' ' : pub;
                dataMarc[8] = pub ? dataMarc[8] + pub : dataMarc[8] + '';
                dataMarc[9] = libro.descripcion ? dataMarc[9] + libro.descripcion : dataMarc[9] + '';
                dataMarc[10] = libro.anio ? dataMarc[10] + libro.anio : dataMarc[10] + '';
                dataMarc[11] = libro.nota ? dataMarc[11] + libro.nota : dataMarc[11] + '';
                dataMarc[12] = dataMarc[12] + '\\$a ' + libro.fecha_cotizacion + ' $b ' + libro.precio + " $e " + libro.precio + " $f " + libro.id_cotizacion;

                const reducer = (acumulator, curr) => acumulator + curr;
                let contenidoLibroMarc = dataMarc.reduce(reducer);
                contenidoLibroMarc = contenidoLibroMarc + '\n'

                contenidoMarc = contenidoMarc + contenidoLibroMarc + '\n'

            }

            console.log('REDUCE:\n', contenidoMarc)
            let textFileAsBlob = new Blob([contenidoMarc], { type: 'text/plain' });

            let downloadLink = document.createElement("a");
            downloadLink.download = nameTxt;
            downloadLink.innerHTML = "texto oculto"
            window.URL = window.URL || window.webkitURL;

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);

            downloadLink.style.display = "none";

            document.body.appendChild(downloadLink);

            downloadLink.click();

        }

        const mostrarBoton = (factura) => {
            var libros = factura.libros
            let nameExcel = "Factura" + factura.id_cotizacion



            for (let i = 0; i < libros.length; i++) {
                let libro = libros[i]

                let infoMarc = [
                    {
                        columns: [
                            { title: "Code", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                            { title: "*Text", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }
                        ],
                        data: [
                            ['=001', '$a MJS'], // 0
                            ['=020', '\\\\$a '], //1 ISBN
                            ['=022', '$a '], //2 ISSN
                            ['=035', '$a MJS'], //3
                            ['=041', '0\$a spa'], //4
                            ['=044', '\\\\$a mx'], //5
                            ['=100', '1\$a '], //6 AUTOR
                            ['=245', '10$a '], //7 TITULO
                            ['=260', '\\\\$a '], //8 CADENA DE TEXTO
                            ['=300', '\\\\$a '], //9 DESCRIP FISICA
                            ['=362', ''], //10 ANIO PUBLICACION
                            ['=500', '$a '], //11 NOTA GENERAL
                            ['=980', ''] //12 FACTURA FECHA ANIO MES DIA
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
                infoMarc[0].data[12][1] = '\\$a ' + libro.fecha_cotizacion + ' $b ' + libro.precio + " $e " + libro.precio + " $f " + libro.id_cotizacion;
                dataSetArray.push(infoMarc) // DataSet[1]
            }

            const prueba = () => {
                console.log(libros)
                libros.map((libro, i) => {
                    console.log(libro, i)
                })
            }

            return (
                <Fragment>
                    {

                        <ExcelFile filename={nameExcel} element={<Button variant="success"><FontAwesomeIcon icon={faFileExcel} /></Button>}>
                            {libros.map((libro, i) => {
                                //console.log(libro, dataSetArray[i])
                                return (
                                    <ExcelSheet dataSet={dataSetArray[i]} name={libro.titulo}></ExcelSheet>
                                )
                            })}
                        </ExcelFile>

                        //<Button variant="success" onClick={() => prueba(dataSetArray)}><FontAwesomeIcon icon={faFileExcel} /></Button>

                    }
                </Fragment>
            )
        }

        const peticionEdit = async (factura) => {
            let url = "https://appi-books.herokuapp.com/api/cotizaciones/" + factura.id_cotizacion
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

        const functionFetchDataFacturas = this.props.functionFetchDataFacturas;
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
                        {this.props.factura.map((factura, i) => {
                            return (
                                <tr key={i}>
                                    <td>{factura.id_cotizacion}</td>
                                    <td>{factura.nombre}</td>
                                    <td>{factura.direccion}</td>
                                    <td>{factura.telefono}</td>
                                    <td>{factura.email}</td>
                                    <td>
                                        {

                                            mostrarBoton(factura)

                                        }
                                        <Button variant="primary text-white" onClick={() => { getMarcTxt(factura) }}>
                                            <FontAwesomeIcon icon={faDownload} />
                                        </Button>
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => { this.peticionDelete(factura); }}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
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

function FacturaM(props) {

    return (
        <Fragment>
            <FacturasContent facturas={props} />
        </Fragment>
    );
}

export default FacturaM