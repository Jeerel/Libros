import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSearch, faFileExcel, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, FloatingLabel, Form, Col } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function FacturasContents(props) {
    //asignacion de constantes, variables, y estados
    const [facturas, setFacturas] = useState([]);
    const [tablaFacturas, setTablaFacturas] = useState([]);
    const [filtroFactura, setFiltroFactura] = useState("");
    const functionFetchData = props.facts.fetchDataFacturas

    const getContent = async () => {
        setFacturas(props.facts.factura);
        setTablaFacturas(props.facts.factura);
    }

    //Funcion de filtrado para el campo isbn e issn
    const handleChangeFactura = async (e) => {
        e.persist();
        setFiltroFactura(e.target.value);
        filtrarFactur(e);
    }
    //funcion que filtrara de acuerdo a ciertas validaciones
    const filtrarFactur = (e) => {
        //asignamos a una variable array lo que regrese la funcion filter
        let arrayFiltrado = tablaFacturas.filter((libro) => {
            //como la funcion filter tiene su callback, generamos una funcion dentro de filter
            //validacion de que tenga año el libro
            if (libro.id_cotizacion) {
                if (libro.id_cotizacion.toString().includes(e.target.value.toString())) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                    return libro //si lo contiene lo regresamos
                }
            }
        });

        setFacturas(arrayFiltrado);
    }
    //fin de la funcion filtrarISBN_ISSN

    useEffect(() => {
        getContent();
    }, []);
    return (

        <Fragment>
            <Col xs={12} md={3} className="mt-2">

                <FloatingLabel
                    controlId="floatingInput"
                    label="# Factura">
                    <Form.Control
                        type="text"
                        placeholder="# Factura"
                        value={filtroFactura}
                        name="numberFactura"
                        onChange={handleChangeFactura} />
                </FloatingLabel>
            </Col>

            <div className="col-xs-12 col-md-12 mt-5">
                <FacturasContent thisProps={props} facturas={facturas} functionFetchData={functionFetchData} />

            </div>
        </Fragment>
    )

}

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
                this.setState({ data: response.data.body });
            })
            .catch(function (error) {
            });

    }

    render() {
        const formFilter = this.state.formFilter;
        const factura = this.props.facturas;
        const functionFetchDataFacturas = this.props.thisProps.facts.fetchDataFacturas;
        const functionFetchDataClientes = this.props.thisProps.facts.fetchDataClientes;
        const functionFetchDataLibros = this.props.thisProps.facts.fetchDataLibros;
        const dataCliente = this.props.thisProps.facts.clientes;
        const dataLibro = this.props.thisProps.facts.libros;
        return (
            <Fragment>
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
            let year = new Date().getFullYear().toString().substr(-2) //obtenemos el año con el formato de YY
            let month = new Date().getMonth() + 1;
            month = month.toString().length === 1 ? '0' + month.toString() : month; //obtenemos el mes con el formato de MM
            let day = new Date().getDate();
            day = day.toString().length === 1 ? '0' + day.toString() : day; //obtenemos el dia con el formato de DD

            let yeatString = year.toString();
            let monthString = month.toString();
            let dayString = day.toString();
            let fullYear = new Date().getFullYear();

            for (let i = 0; i < libros.length; i++) {
                let libro = libros[i];

                let pub = libro.placePub ? libro.placePub : '';
                pub = libro.editorial ? pub + " : $b " + libro.editorial + ' ' : pub;
                pub = libro.anio ? pub + ', $c ' + libro.anio + ' ' : pub;

                console.log(libro)
                let dataMarc21 = '';

                if (libro.isbn != " ") {
                    console.log('isbn: ', libro.isbn)
                    dataMarc21 = `
\n
=LDR  00000nam  2200000Ia 4500
=008  ${yeatString}${monthString}${dayString}?${fullYear}\\\\\\\\MX\\\\\\\\\\\\\\\\\\\\\\\\000\\0\\SPA\\d
=020  \\\\$a ${libro.isbn}
=040  \\\\$a mx
=100  1\\$a ${libro.autor}
=245  10$a ${libro.titulo}
=260  2\\$a ${pub}
=300  \\\\$a ${libro.paginas} p.
=980  \\\\$a${fullYear}${month}${dayString}$f${libro.id_cotizacion}
                    \n
                `
                } else if (libro.issn != " ") {
                    console.log('issn', libro.issn)
                    dataMarc21 = `
                \n
=LDR  00000nam  2200000Ia 4500
=008  ${yeatString}${monthString}${dayString}?${fullYear}\\\\\\\\MX\\\\\\\\\\\\\\\\\\\\\\\\000\\0\\SPA\\d
=022  \\\\$a ${libro.issn}
=040  \\\\$a mx
=100  1\\$a ${libro.autor}
=245  10$a ${libro.titulo}
=260  2\\$a ${pub}
=300  \\\\$a ${libro.paginas} p.
=980  \\\\$a${fullYear}${month}${dayString}$f${libro.id_cotizacion}
                \n
                `
                }

                /*let dataMarc = [

                    ['\n=LDR  00000nam  2200000Ia 4500'], //[0] - LEADER aun falta por sacar e investigar
                    [''] //[1] - =008  YYMMDD?DAT1\\\\CNT\\\\\\\\\\\000\0\LNG\d -----> tiene que tener 41 caracteres de longitud, si no mide eso, agregar '\'
                    ['\n=020  \\\\$a '], //[2] ISBN
                    ['\n=022  \\\\$a '], //[3] ISSN
                    ['\n=040  \\\\$a mx'], //[4] MX
                    ['\n=100  1\\$a '], //[5] AUTOR
                    ['\n=245  10$a '], //[6] TITULO
                    ['\n=260  1\\$a '], //[7] CADENA DE TEXTO
                    ['\n=300  \\\\$a '], //[8] NUM DE PAGINAS 25 p.
                    ['\n=980  '] //[9] FACTURA FECHA ANIO MES DIA
                ]*/

                contenidoMarc = contenidoMarc + dataMarc21 + '\n'

            }
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
                libros.map((libro, i) => {
                })
            }

            return (
                <Fragment>
                    {

                        <ExcelFile filename={nameExcel} element={<Button variant="success"><FontAwesomeIcon icon={faFileExcel} /></Button>}>
                            {libros.map((libro, i) => {
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
            <FacturasContents facts={props} />
        </Fragment>
    );
}

export default FacturaM