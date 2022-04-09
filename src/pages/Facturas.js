import React, { Fragment } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../App.css"

//componentes
import PageLoading from "../components/PageLoading";
import FacturasM from "../components/Facturas/Facturas";
import ModalAddFactura from "../components/modals/facturas/ModalAddFactura";

class Factura extends React.Component {

    //estado de pagina de factura
    state = {
        loading: true,
        error: null,
        data: undefined,
        modalInsertar: false,
        dataCliente: undefined,
        dataLibros: undefined
    }

    componentDidMount() {
        this.fetchDataFacturas();
        this.fetchDataClientes();
        this.fetchDataLibros();
    }

    fetchDataFacturas = async () => {
        console.log(123)
        const url = "https://appi-books.herokuapp.com/api/facturas";
        let config = {
            method: "GET",
            url: url,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.is_security,
                "Content-Type": "application/json",
            },
        };

        this.setState({ loading: true, error: null });

        await axios(config).then((response) => {
            this.setState({ loading: false, data: response.data.body })
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }

    fetchDataClientes = async () => {
        const url = "https://appi-books.herokuapp.com/api/clientes";
        let config = {
            method: "GET",
            url: url,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.is_security,
                "Content-Type": "application/json",
            },
        };

        this.setState({ loading: true, error: null });

        await axios(config).then((response) => {
            let data = response.data.body
            this.setState({ loading: false, dataCliente: data })
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }

    fetchDataLibros = async () => {
        const url = "https://appi-books.herokuapp.com/api/libros";
        let config = {
            method: "GET",
            url: url,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.is_security,
                "Content-Type": "application/json",
            },
        };
        this.setState({ loading: true, error: null });
        await axios(config).then((response) => {
            this.setState({ loading: false, dataLibros: response.data.body })
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        })
    };

    modalInsertar() {
        this.setState({ form: null, modalInsertar: !this.state.modalInsertar })
    }

    handleOpenModal = e => {
        this.setState({ modalInsertar: true });
    };

    handleCloseModal = e => {
        this.setState({ modalInsertar: false });
    };

    render() {

        if (this.state.loading === true && !this.state.data && !this.state.dataCliente && !this.state.dataLibros) {
            return <PageLoading />
        }

        if (this.state.error) {
            //pagina error
        }

        if (this.state.loading === false && this.state.data && this.state.dataCliente && this.state.dataLibros) {
            return (
                <Fragment>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <h1>Facturas</h1>
                            </div>
                            <FacturasM
                                factura={this.state.data}
                                fetchDataFacturas={this.fetchDataFacturas}
                                fetchDataClientes={this.fetchDataClientes}
                                fetchDataLibros={this.fetchDataLibros}
                                clientes={this.state.dataCliente}
                                libros={this.state.dataLibros}
                            />
                        </div>
                        <div className="fixed-action-btn">
                            <button
                                className="btn-floating"
                                onClick={() => {
                                    this.modalInsertar();
                                }}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                    <ModalAddFactura
                        onCloseModal={this.handleCloseModal}
                        onOpenModal={this.handleOpenModal}
                        modalIsOpen={this.state.modalInsertar}
                        fetchDataFacturas={this.fetchDataFacturas}
                        fetchDataClientes={this.fetchDataClientes}
                        fetchDataLibros={this.fetchDataLibros}
                        clientes={this.state.dataCliente}
                        libros={this.state.dataLibros}
                    />
                </Fragment>
            )
        }

        return null;
    }
}

export default Factura;