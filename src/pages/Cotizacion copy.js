import React, { Fragment, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPrint, faSave } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import "../App.css"

//components
import PageLoading from '../components/PageLoading'
import CotizacionM from "../components/Cotización/Cotización";
import ModalAddCliente from "../components/modals/cotizaciones/addProductos";

class cotizacionProductos extends React.Component {

    //estado de pagina de clientes
    state = {
        loading: true,
        error: null,
        data: [],
        dataLibros:[],
        dataClientes:[],
        dataProductos: [],
        modalInsertar: false,
        count: 0,
        dataPrueba: [],
        dataCliente:{}
    };

    //definicion de sus metodos

    addProducto = async (arrayData) => {
        await this.setState({ dataPrueba: arrayData })
        this.fetchDataAddProductos();
    }

    setClienteState = async (obj)=>{
        await this.setState({ dataCliente: obj })        
    }

    componentDidMount() {
        this.closeLoader()    
    }
    closeLoader = async () => {
        const url = "https://appi-books.herokuapp.com/api/cliente";
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
            this.setState({ loading: false, dataClientes: response.data })
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }
    fetchDataAddProductos = async () => {
            this.setState({ loading: false, dataProductos: this.state.dataPrueba })
    }

    fetchDataLibros = async () => {
        const url = "https://appi-books.herokuapp.com/api/libros";
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

        this.setState({error: null });

        await axios.get(url).then((response) => {
            this.setState({ loading: false, dataLibros: response.data })
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }

    fetchDataProductos = async () => {
        this.setState({ loading: false, dataProductos: [] })
    }
    peticionSaveCoticacion = async () =>{
        let obj={
            idCliente:this.state.dataCliente.id,
            datos:this.state.dataPrueba
        }
        const url = "https://appi-books.herokuapp.com/api/cotizacion";
        axios
            .post(url, obj)
            .then((response) => {
                let idCotizacion=response.data.idCotizacion;
                swal("Cotización creada #"+idCotizacion, { icon: "success", });
                this.setState({ dataPrueba: [],dataCliente:{} })
                
            })
            .catch((error) => {
                return error;
            });        
    }

    peticionGetLibros = async () => {
        const url = "https://appi-books.herokuapp.com/api/libros";
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
        this.setState({ error: null });

        await axios.get(url).then((response) => {
            this.setState({ loading: false, modalInsertar: !this.state.modalInsertar, dataLibros: response.data })
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }

    modalInsertar(data) {
        this.setState({ form: null, modalInsertar: !this.state.modalInsertar })
    }

    handleOpenModal = e => {
        this.setState({ modalInsertar: true });
    };

    handleCloseModal = e => {
        this.setState({ modalInsertar: false });
        
    };



    render() {
        if (this.state.loading === true && !this.state.data) {
            return <PageLoading />
        }

        if (this.state.error) {
            //pagina de error
        }

        if (this.state.loading === false && this.state.data) {

            return (
                <Fragment>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <h3>Nueva cotización</h3>
                                <hr></hr>
                            </div>
                            <div className="col-xs-12 col-md-6 top">
                                <button
                                    className="btn btn-primary text-white"
                                    onClick={() => { this.peticionGetLibros(); }}>
                                    <FontAwesomeIcon icon={faPlus} /> Agregar productos
                                </button>
                                <button
                                    className="btn btn-secondary btn-xs">
                                    <FontAwesomeIcon icon={faPrint} /> Imprimir
                                </button>
                                <button
                                    className="btn btn-primary text-white"
                                    onClick={() => { this.peticionSaveCoticacion(); }}>
                                    <FontAwesomeIcon icon={faSave} /> Guardar
                                </button>
                            </div>
                            <CotizacionM setClienteState={this.setClienteState} clientes={this.state.dataPrueba} clientesArray={this.state.dataClientes} fetchDataLibros={this.fetchDataAddProductos} />
                        </div>

                    </div>
                    <ModalAddCliente
                        dataLibros={this.state.dataLibros}
                        onCloseModal={this.handleCloseModal}
                        onOpenModal={this.handleOpenModal}
                        modalIsOpen={this.state.modalInsertar}
                        fetchDataLibros={this.fetchDataLibros}
                        addProducto={this.addProducto}
                    //setArregloData={setArregloData}
                    />
                </Fragment>
            )
        }

        return null;

    }

}

export default cotizacionProductos