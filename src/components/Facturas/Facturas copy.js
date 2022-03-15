import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSearch, faFileExcel, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
import { CSVLink } from 'react-csv';
//import ExportExcel from "react-export-excel";
import axios from "axios";

const ExcelFile = ExportExcel.ExcelFile; //este indica el archivo de excel que vamos a crear
const ExcelSheet = ExportExcel.ExcelFile.ExcelSheet; //este la hoja del excel
const ExcelColumn = ExportExcel.ExcelFile.ExcelColumn; //este la columna
const ExcelRow = ExportExcel.ExcelFile.ExcelRow; //este la fila 
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

        let data = [];

        const headers = [
            { label: "Code", key: "code" },
            { label: "*Text", key: "text" }
        ];

        const downloadMARC21 = async (response) => {

            data = [];

            for (let i = 0; i < response.libros.length; i++) {
                let libro = response.libros[i]
                data.push({
                    code: "01",
                    text: "$a MJS"
                })
                if (libro.isbn) {
                    data.push({
                        code: "020",
                        text: "$a " + libro.isbn
                    })
                }
                if (libro.issn) {
                    data.push({
                        code: "022",
                        text: "$a " + libro.issn
                    })
                }

                data.push({
                    code: "35",
                    text: "$a MJS"
                })

                data.push({
                    code: "041",
                    text: "$a spa"
                })
                data.push({
                    code: "044",
                    text: "$a mx"
                })
                if (libro.autor) {
                    data.push({
                        code: "100",
                        text: "$a " + libro.autor
                    })
                }
                if (libro.titulo) {
                    data.push({
                        code: "245",
                        text: "$a " + libro.titulo
                    })
                }
                var text = ""
                if (libro.placePub) {
                    text += " $a " + libro.placePub
                }

                if (libro.editorial) {
                    text += " $b " + libro.editorial
                }

                if (libro.anio) {
                    text += " $c " + libro.anio
                }

                data.push({
                    code: "260",
                    text: text
                })

                if (libro.descripcion) {
                    data.push({
                        code: "300",
                        text: "$a " + libro.descripcion
                    })
                }
                if (libro.anio) {
                    data.push({
                        code: "362",
                        text: "$a " + libro.anio
                    })
                }
                if (libro.nota) {
                    data.push({
                        code: "500",
                        text: "$a " + libro.nota
                    })
                }
                data.push({
                    code: "980",
                    text: "$a " + libro.fecha_facturada + " $b " + libro.precio + " $e " + libro.precio + " $f" + libro.idFactura
                })
            }

            console.log(data);

            this.setState({ ...this.state, dataLibros: data })
            return (
                <CSVLink data={data} >
                </CSVLink>
            )
        }

        let newData = []

        const exportMarc21 = (factura) => {

            console.log(factura)
            console.log(factura.libros.length)
            newData = []
            let MarcInfo = {
                numControl: {
                    code: '001',
                    content: "$a MJS" //fijo
                },
                isbn: {
                    code: '020',
                    content: '$a ' //ISBN
                },
                issn: {
                    code: '022',
                    content: '$a ' //ISSN
                },
                numControlC: {
                    code: '035',
                    content: '$a MJS' //fijo
                },
                languageCode: {
                    code: '041',
                    content: '$a spa' //fijo
                },
                countryCode: {
                    code: '044',
                    content: '$a mx' //fijo
                },
                author: {
                    code: '100',
                    content: '$a ' //autor
                },
                title: {
                    code: '245',
                    content: '$a '//titulo

                },
                pub: {
                    code: '260',
                    content: '$a ' //cadena de texto publicacion
                },
                physicDescrip: {
                    code: '300',
                    content: '$a ' //descripcion fisica
                },
                PubYear: {
                    code: '362',
                    content: '', //anio publicacion
                },
                note: {
                    code: '500',
                    content: '$a ' //nota general
                },
                invoce: {
                    code: '980',
                    content: '' //factura fecha anio mes dia
                }
            }

            //validamos que el array sea menor a 1, esto significa que la factura tiene mas de un libro
            if (factura.libros.length === 1) {

                let libro = factura.libros[0]

                MarcInfo.isbn.content = libro.isbn ? MarcInfo.isbn.content + libro.isbn : '';
                MarcInfo.issn.content = libro.issn ? MarcInfo.issn.content + libro.issn : '';
                MarcInfo.author.content = libro.autor ? MarcInfo.author.content + libro.autor : '';
                MarcInfo.title.content = libro.titulo ? MarcInfo.title.content + libro.titulo : '';

                let pub = libro.placePub ? "$a " + libro.placePub + ' ' : '';
                pub = libro.editorial ? pub + "$b" + libro.editorial + ' ' : pub;
                pub = libro.anio ? pub + '$c ' + libro.anio + ' ' : pub;
                MarcInfo.pub.content = pub ? pub : '';

                MarcInfo.physicDescrip.content = libro.descripcion ? MarcInfo.physicDescrip.content + libro.descripcion : '';
                MarcInfo.PubYear.content = libro.anio ? MarcInfo.PubYear.content + libro.anio : '';

                MarcInfo.note.content = libro.nota ? MarcInfo.note.content + libro.nota : '';

                //checar el formato para $b que indica el precio sin decima y $e monto sin formato decimal?
                MarcInfo.invoce.content = '$a ' + libro.fecha_facturada + ' $b ' + libro.precio + " $e " + libro.precio + " $f " + libro.idFactura;

                newData.push(MarcInfo);

                //await this.setState({ ...this.state, dataLibros: newData })
                this.setState({ ...this.state, dataLibros: newData })
                dataPrueba = [
                    {
                        numControl: 'NUMERO DE CONTROL',
                        isbn: 1231234,
                        issn: 456456,
                        author: 'GOYO'
                    },
                    {
                        numControl: 'NUMERO DE CONTROL',
                        isbn: 1231234,
                        issn: 456456,
                        author: 'GOYO'
                    },
                    {
                        numControl: 'NUMERO DE CONTROL',
                        isbn: 1231234,
                        issn: 456456,
                        author: 'GOYO'
                    }
                ]
                console.log('AQUI: ', newData)
                console.log('data prueba: ', dataPrueba)
            }

        }

        const exportMarc21Prueba = (factura) => {

            console.log(factura)
            console.log(factura.libros.length)
            newData = []
            let MarcInfo = {
                numControl: {
                    code: '001',
                    content: "$a MJS" //fijo
                },
                isbn: {
                    code: '020',
                    content: '$a ' //ISBN
                },
                issn: {
                    code: '022',
                    content: '$a ' //ISSN
                },
                numControlC: {
                    code: '035',
                    content: '$a MJS' //fijo
                },
                languageCode: {
                    code: '041',
                    content: '$a spa' //fijo
                },
                countryCode: {
                    code: '044',
                    content: '$a mx' //fijo
                },
                author: {
                    code: '100',
                    content: '$a ' //autor
                },
                title: {
                    code: '245',
                    content: '$a '//titulo

                },
                pub: {
                    code: '260',
                    content: '$a ' //cadena de texto publicacion
                },
                physicDescrip: {
                    code: '300',
                    content: '$a ' //descripcion fisica
                },
                PubYear: {
                    code: '362',
                    content: '', //anio publicacion
                },
                note: {
                    code: '500',
                    content: '$a ' //nota general
                },
                invoce: {
                    code: '980',
                    content: '' //factura fecha anio mes dia
                }
            }

            //validamos que el array sea menor a 1, esto significa que la factura tiene mas de un libro
            if (factura.libros.length === 1) {

                let libro = factura.libros[0]

                MarcInfo.isbn.content = libro.isbn ? MarcInfo.isbn.content + libro.isbn : '';
                MarcInfo.issn.content = libro.issn ? MarcInfo.issn.content + libro.issn : '';
                MarcInfo.author.content = libro.autor ? MarcInfo.author.content + libro.autor : '';
                MarcInfo.title.content = libro.titulo ? MarcInfo.title.content + libro.titulo : '';

                let pub = libro.placePub ? "$a " + libro.placePub + ' ' : '';
                pub = libro.editorial ? pub + "$b" + libro.editorial + ' ' : pub;
                pub = libro.anio ? pub + '$c ' + libro.anio + ' ' : pub;
                MarcInfo.pub.content = pub ? pub : '';

                MarcInfo.physicDescrip.content = libro.descripcion ? MarcInfo.physicDescrip.content + libro.descripcion : '';
                MarcInfo.PubYear.content = libro.anio ? MarcInfo.PubYear.content + libro.anio : '';

                MarcInfo.note.content = libro.nota ? MarcInfo.note.content + libro.nota : '';

                //checar el formato para $b que indica el precio sin decima y $e monto sin formato decimal?
                MarcInfo.invoce.content = '$a ' + libro.fecha_facturada + ' $b ' + libro.precio + " $e " + libro.precio + " $f " + libro.idFactura;

                newData.push(MarcInfo);

                //await this.setState({ ...this.state, dataLibros: newData })
                this.setState({ ...this.state, dataLibros: newData })
                dataPrueba = [
                    {
                        numControl: 'NUMERO DE CONTROL',
                        isbn: 1231234,
                        issn: 456456,
                        author: 'GOYO'
                    },
                    {
                        numControl: 'NUMERO DE CONTROL',
                        isbn: 1231234,
                        issn: 456456,
                        author: 'GOYO'
                    },
                    {
                        numControl: 'NUMERO DE CONTROL',
                        isbn: 1231234,
                        issn: 456456,
                        author: 'GOYO'
                    }
                ]
                console.log('AQUI: ', newData)
                console.log('data prueba: ', dataPrueba)

            }

        }

        let dataPrueba = [
            {
                ciudad: 'CDMX',
                poblacion: 1234,
                entidad: "ciudad de mexico",
                pais: 'Mexcio'
            },
            {
                ciudad: 'ecatepec',
                poblacion: 532,
                entidad: 'Estado de mexico',
                pais: 'Mexico'
            },
            {
                ciudad: 'Guadalajara',
                poblacion: 1234,
                entidad: "Jalisco",
                pais: 'Mexcio'
            }
        ]

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
                                                onClick={() => { downloadMARC21(factura); }}>
                                                <FontAwesomeIcon icon={faDownload} />
                                            </button>
                                        </CSVLink>
                                        {/*<Button variant="success" onClick={() => { exportMarc21(factura); }}><FontAwesomeIcon icon={faFileExcel} /></Button>*/}

                                        {
                                            /*
                                            TODO:
                                            <ExcelFile element={<Button variant="success" onClick={() => { exportMarc21(factura); }}><FontAwesomeIcon icon={faFileExcel} /></Button>}
                                            filename="MARC21">
                                                <ExcelSheet data={dataPrueba} name="PRUEBA">
                                                    <ExcelColumn label="Ciudad" value="numControl" />
                                                    <ExcelColumn label="Poblacion" value="isbn" />
                                                    <ExcelColumn label="Entidad" value="issn" />
                                                    <ExcelColumn label="Pais" value="author" />
                                                </ExcelSheet>
                                            </ExcelFile>
                                            FIXME:
                                            */

                                            /*
                                            TODO: ESTE ES CASO DE PRUEBA QUE SI FUNCIONA
                                            <ExcelSheet data={dataPrueba} name="PRUEBA">
                                            <ExcelColumn label="Ciudad" value="ciudad" />
                                            <ExcelColumn label="Poblacion" value="poblacion" />
                                            <ExcelColumn label="Entidad" value="entidad" />
                                            <ExcelColumn label="Pais" value="pais" />
                                            </ExcelSheet>
                                            FIXME: FIN DE CASO DE PRUEBA
                                            factura.libros.length === 1 ?
                                                console.log('AQUI VAMOS BIEN')
                                                /*<Fragment>
                                                    <ExcelSheet data={() => {
                                                        console.log('NEWNEWNEW', newData)
                                                        return newData
                                                    }} name={factura.libros[0].titulo}>
                                                        <ExcelRow label="001" value="numControl.content" />
                                                    </ExcelSheet>
                                                </Fragment> /
                                                : null
                                            <Fragment>
                                                    <ExcelSheet dataSet={this.state.dataLibros} name={factura.libros[0].titulo}>
                                                        <ExcelRow label="001" value="numControl.content" />
                                                    </ExcelSheet>
                                                </Fragment> */
                                            //renderOneDataExcel() :
                                            //renderMultipleDataExcel()
                                            //< ExcelSheet data={this.state.dataLibros} name={factura}>
                                            //</ExcelSheet>
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