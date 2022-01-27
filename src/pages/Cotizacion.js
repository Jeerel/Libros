import React, { Fragment, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPrint } from "@fortawesome/free-solid-svg-icons";
import "../App.css"

//components
import PageLoading from '../components/PageLoading'
import ClientesM from "../components/Cotización/Cotización";
import ModalAddCliente from "../components/modals/cotizaciones/addProductos";

class cotizacionProductos extends React.Component {
    

    //estado de pagina de clientes
    state = {
        loading: true,
        error: null,
        data: [],
        dataProductos:[],
        modalInsertar: false,
        count: 0
    };

    //definicion de sus metodos

    componentDidMount() {
        this.fetchDataClientes();
    }

    fetchDataClientes = async () => {
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

    fetchDataProductos = async () => {
        this.setState({ loading: false, dataProductos: []})
    }

    peticionGetLibros = async ()=>{        
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

        this.setState({ loading: true, error: null });

        await axios.get(url).then((response) => {
             console.log(response.data)
            this.setState({ loading: false, modalInsertar: !this.state.modalInsertar,dataLibros: response.data })            
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }
    
    modalInsertar(data) {
        console.log("DAta",data)
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
                        <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
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
                </div>
                            <ClientesM clientes={this.state.data} fetchDataClientes={this.fetchDataClientes} />
                        </div>
                        
                    </div>
                    <ModalAddCliente
                        dataLibros={this.state.dataLibros}
                        onCloseModal={this.handleCloseModal}
                        onOpenModal={this.handleOpenModal}
                        modalIsOpen={this.state.modalInsertar}
                        fetchDataClientes={this.fetchDataClientes}
                        //setArregloData={setArregloData}
                    />
                </Fragment>
            )
        }

        return null;

    }

}

export default cotizacionProductos