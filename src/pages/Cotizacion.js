import React, { Fragment } from "react";
import axios from "axios";
import PageLoading from "../components/PageLoading";

import CotizacionM from "../components/Cotización/Cotización";

class Cotizacion extends React.Component {
    state = {
        loading: true,
        error: null,
        data: undefined
    }

    componentDidMount() {
        this.fetchDataCotizaciones();
    }

    fetchDataCotizaciones = async () => {
        const url = "https://appi-books.herokuapp.com/api/cotizaciones";
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
            this.setState({ loading: false, data: response.data })
        }).catch((error) => {
            this.setState({ loading: false, error: error });
        });
    }

    render() {
        if (this.state.loading === true && !this.state.data) {
            return <PageLoading />
        }
        return (
            <Fragment>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <h1>Cotizaciones</h1>
                        </div>
                        <CotizacionM cotizacion={this.state.data} fetchDataCotizaciones={this.fetchDataCotizaciones} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Cotizacion;