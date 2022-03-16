import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSearch, faFileExcel, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
import { CSVLink } from 'react-csv';
import ReactExport from "react-data-export";
import axios from "axios";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
/*

    TODO:
    debemos de asegurarnos que el token sea dinamico al momento de hacer peticiones get, post o put
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1Mjc5MTcwLCJleHAiOjE2NDUzMDc5NzB9.HWcMBHnPQpWH7O7vsvNuXnWQJob8Q4LLz6_grOnSFRU
    FIXME:
*/

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
            url: 'https://appi-books.herokuapp.com/api/filters/facturacion',
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
                            value={formFilter ? formFilter.idFactura : ""}
                            name="idFactura"
                            id="idFactura"
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
        dataLibros: [],
    };

    handleCloseModal = async () => {
        await this.setState({ triggerEditModal: false, formEdit: undefined })
    }

    handleOpenModal = e => {
        this.setState({ triggerEditModal: true });
    };

    render() {

        let DataSet = [
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
        ];

        let DataSet2 = [
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
        ];

        let dataSetArray = [
            /*[
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
            ],
            [
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
            ]*/
        ];

        const mostrarBoton = (libros) => {

            for (let i = 0; i < libros.length; i++) {

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
                if (i === 0) {
                    infoMarc[0].data[1][1] = 'CHOCOLATE!'
                    infoMarc[0].data[2][1] = 'CHOCOLATE!2'
                    infoMarc[0].data[3][1] = 'CHOCOLATE!3'
                } else if (i === 1) {
                    infoMarc[0].data[1][1] = 'Vainilla!'
                    infoMarc[0].data[2][1] = 'Vainilla!2'
                    infoMarc[0].data[3][1] = 'Vainilla!3'
                }
                dataSetArray.push(infoMarc) // DataSet[1]
            }

            return (
                <Fragment>
                    <ExcelFile filename="ExcelMarc" element={<Button variant="success"><FontAwesomeIcon icon={faFileExcel} /></Button>}>
                        {libros.map((libro, i) => {
                            return (
                                <ExcelSheet dataSet={dataSetArray[i]} name={'hoja ' + i}></ExcelSheet>
                            )
                        })}
                    </ExcelFile>
                </Fragment>
            )
        }

        const exportMarc21 = (factura) => {

            console.log(factura)
            console.log(factura.libros.length)
            //DataSet[0].data[1]
            //DataSet[0].data[1][1] = '$a 187838'
            //console.log(DataSet[0].data[1][1])
            let libro = factura.libros[0]
            console.log(libro)

            DataSet[0].data[1][1] = libro.isbn ? DataSet[0].data[1][1] + libro.isbn : '';

            DataSet[0].data[2][1] = libro.issn ? DataSet[0].data[2][1] + libro.issn : '';

            DataSet[0].data[6][1] = libro.autor ? DataSet[0].data[6][1] + libro.autor : '';

            DataSet[0].data[7][1] = libro.titulo ? DataSet[0].data[7][1] + libro.titulo : '';

            let pub = libro.placePub ? "$a " + libro.placePub + ' ' : '';
            pub = libro.editorial ? pub + "$b" + libro.editorial + ' ' : pub;
            pub = libro.anio ? pub + '$c ' + libro.anio + ' ' : pub;
            DataSet[0].data[8][1] = pub ? pub : '';

            DataSet[0].data[9][1] = libro.descripcion ? DataSet[0].data[9][1] + libro.descripcion : '';

            DataSet[0].data[10][1] = libro.anio ? DataSet[0].data[10][1] + libro.anio : '';

            DataSet[0].data[11][1] = libro.nota ? DataSet[0].data[11][1] + libro.nota : '';

            //checar el formato para $b que indica el precio sin decima y $e monto sin formato decimal?
            DataSet[0].data[12][1] = '$a ' + libro.fecha_facturada + ' $b ' + libro.precio + " $e " + libro.precio + " $f " + libro.idFactura;
            //DataSet = []
            /*let MarcInfo = {
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
            }*/

            //validamos que el array sea menor a 1, esto significa que la factura tiene mas de un libro
            /*if (factura.libros.length === 1) {

                let libro = factura.libros[0]

                //DataSet[0].data[1]
                //DataSet[0].data[1][1] = '$a 187838'
                //console.log(DataSet[0].data[1][1])

                MarcInfo.data[1][1] = libro.isbn ? MarcInfo.data[1][1] + libro.isbn : '';

                MarcInfo.data[2][1] = libro.issn ? MarcInfo.data[2][1] + libro.issn : '';

                MarcInfo.data[6][1] = libro.autor ? MarcInfo.data[6][1] + libro.autor : '';

                MarcInfo.data[7][1] = libro.titulo ? MarcInfo.data[7][1] + libro.titulo : '';

                let pub = libro.placePub ? "$a " + libro.placePub + ' ' : '';
                pub = libro.editorial ? pub + "$b" + libro.editorial + ' ' : pub;
                pub = libro.anio ? pub + '$c ' + libro.anio + ' ' : pub;
                MarcInfo.data[8][1] = pub ? pub : '';

                MarcInfo.data[9][1] = libro.descripcion ? MarcInfo.data[9][1] + libro.descripcion : '';

                MarcInfo.data[10][1] = libro.anio ? MarcInfo.data[10][1] + libro.anio : '';

                MarcInfo.data[11][1] = libro.nota ? MarcInfo.data[11][1] + libro.nota : '';

                //checar el formato para $b que indica el precio sin decima y $e monto sin formato decimal?
                MarcInfo.data[12][1] = '$a ' + libro.fecha_facturada + ' $b ' + libro.precio + " $e " + libro.precio + " $f " + libro.idFactura;

                DataSet.push(MarcInfo);
                console.log(DataSet)

            }*/

        }

        const exportMarc21Mul = async (factura) => {

            dataSetArray = [];

            console.log('ANTES DE FOR', dataSetArray)

            for (let i = 0; i < factura.libros.length; i++) {
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
                infoMarc[0].data[1][1] = 'CHOCOLATE!'
                infoMarc[0].data[2][1] = 'CHOCOLATE!2'
                infoMarc[0].data[3][1] = 'CHOCOLATE!3'
                await dataSetArray.push(infoMarc) // DataSet[1]
            }

            console.log('DESPUES DE FOR', dataSetArray)

        }

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
                            <th>Libros</th>
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
                                    <td>{factura.libros.length}</td>
                                    <td>
                                        {/*<Button variant="success" onClick={() => { exportMarc21(factura); }}><FontAwesomeIcon icon={faFileExcel} /></Button>*/}
                                        {
                                            factura.libros.length === 1 ? (
                                                <ExcelFile filename="PRUEBA" element={<Button variant="success" onClick={() => { exportMarc21(factura); }}><FontAwesomeIcon icon={faFileExcel} /></Button>}>
                                                    <ExcelSheet dataSet={DataSet} name="PRUEBANAME"></ExcelSheet>
                                                </ExcelFile>
                                            ) : mostrarBoton(factura.libros)
                                            /*<ExcelFile filename="ExcelMarc" element={<Button variant="success" onClick={() => { exportMarc21Mul(factura); }}><FontAwesomeIcon icon={faFileExcel} /></Button>}>
                                                <ExcelSheet dataSet={dataSetArray[0]} name="hoja1"></ExcelSheet>
                                                <ExcelSheet dataSet={dataSetArray[1]} name="hoja2"></ExcelSheet>
                                            </ExcelFile>*/
                                        }
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