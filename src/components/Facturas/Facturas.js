import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import axios from "axios";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


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
                console.log(response)
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
                    <Button variant="btn btn-primary btnTop" onClick={() => this.peticionAvanced()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
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

        let dataSetArray = [];

        const mostrarBoton = (factura) => {
            var libros = factura.libros
            let nameExcel = "Factura" + factura.idFactura
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
                infoMarc[0].data[12][1] = '$a ' + libro.fecha_facturada + ' $b ' + libro.precio + " $e " + libro.precio + " $f " + libro.idFactura;
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
                                        {
                                            mostrarBoton(factura)
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