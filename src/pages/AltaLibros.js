import React, { Fragment } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../App.css"


//Components
import PageLoading from "../components/PageLoading";
import Libros from "../components/libros/Libros";
import ModalAddLibro from "../components/modals/libros/addBook";

class AltaLibros extends React.Component {

    state = {
        loading: true,
        error: null,
        data: undefined,
        modalInsertar: false,
        //dataEditorial: undefined
    };

    componentDidMount() {
        this.fetchDataLibros();
        //this.fetchDataEditorial();
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
            this.setState({ loading: false, data: response.data })
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        })
    };

    /*fetchDataEditorial = async () => {
        const url = "https://appi-books.herokuapp.com/api/editorial";
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
        await axios(config).then((response) => {
            this.setState({ loading: false, dataEditorial: response.data });
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        })
    };*/

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
        if (this.state.loading === true && !this.state.data) { //&& !this.state.dataEditorial
            return <PageLoading />
        }

        if (this.state.error) {
            //pagina de error
        }

        if (this.state.loading === false && this.state.data) { // && this.state.dataEditorial
            return (
                <Fragment>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <h1>Alta de Libros</h1>
                            </div>
                            <Libros libros={this.state.data} fetchDataLibros={this.fetchDataLibros} />
                            {/* editoriales={this.state.dataEditorial} */}
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
                    <ModalAddLibro
                        onCloseModal={this.handleCloseModal}
                        onOpenModal={this.handleOpenModal}
                        modalIsOpen={this.state.modalInsertar}
                        fetchDataLibros={this.fetchDataLibros}
                    />
                    {/* editoriales={this.state.dataEditorial} */}
                </Fragment>
            )
        }
        return null;
    }
}
export default AltaLibros;