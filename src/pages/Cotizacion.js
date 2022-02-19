import React, { Fragment } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../App.css"

//componentes
import PageLoading from "../components/PageLoading";
import CotizacionM from "../components/Cotización/Cotización";
import ModalAddCotizacion from "../components/modals/cotizaciones/addCotizacion";

class Cotizacion extends React.Component {

    //estado de pagina de cotizacion
    state = {
        loading: true,
        error: null,
        data: undefined,
        modalInsertar: false,
        dataCliente: undefined,
        dataLibros: undefined
    }

    componentDidMount() {
        this.fetchDataCotizaciones();
        this.fetchDataClientes();
        this.fetchDataLibros();
    }

    fetchDataCotizaciones = async () => {
        const url = "https://appi-books.herokuapp.com/api/cotizaciones";
        let config = {
            method: "GET",
            url: url,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1Mjc5MTcwLCJleHAiOjE2NDUzMDc5NzB9.HWcMBHnPQpWH7O7vsvNuXnWQJob8Q4LLz6_grOnSFRU',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
        };

        this.setState({ loading: true, error: null });

        await axios(config).then((response) => {
            this.setState({ loading: false, data: response.data })
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }

    fetchDataClientes = async () => {
        const url = "https://appi-books.herokuapp.com/api/cliente";
        let config = {
            method: "GET",
            url: url,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1Mjc5MTcwLCJleHAiOjE2NDUzMDc5NzB9.HWcMBHnPQpWH7O7vsvNuXnWQJob8Q4LLz6_grOnSFRU',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
        };

        this.setState({ loading: true, error: null });

        await axios(config).then((response) => {
            this.setState({ loading: false, dataCliente: response.data })
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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1Mjc5MTcwLCJleHAiOjE2NDUzMDc5NzB9.HWcMBHnPQpWH7O7vsvNuXnWQJob8Q4LLz6_grOnSFRU',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
        };
        this.setState({ loading: true, error: null });
        await axios(config).then((response) => {
            this.setState({ loading: false, dataLibros: response.data })
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
                                <h1>Cotizaciones</h1>
                            </div>
                            <CotizacionM cotizacion={this.state.data} fetchDataCotizaciones={this.fetchDataCotizaciones} />
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
                    <ModalAddCotizacion
                        onCloseModal={this.handleCloseModal}
                        onOpenModal={this.handleOpenModal}
                        modalIsOpen={this.state.modalInsertar}
                        fetchDataCotizaciones={this.fetchDataCotizaciones}
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

export default Cotizacion;