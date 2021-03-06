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
    };

    componentDidMount() {
        this.fetchDataLibros();

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
            let data = response.data.body || []
            this.setState({ loading: false, data: data })
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
                                <h1>Libros</h1>
                            </div>
                            <Libros libros={this.state.data} fetchDataLibros={this.fetchDataLibros} />
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
                </Fragment>
            )
        }
        return null;
    }
}
export default AltaLibros;