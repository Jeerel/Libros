import React, { Fragment } from "react";
import axios from "axios";
import PageLoading from "../components/PageLoading";

import FacturasM from "../components/Facturas/Facturas";

class Facturas extends React.Component {
    state = {
        loading: true,
        data: undefined
    }

    componentDidMount() {
        this.fetchDataFacturas();
    }

    fetchDataFacturas = async () => {
        const url = "https://appi-books.herokuapp.com/api/facturas";
        let config = {
            method: "GET",
            url: url,
            headers: {
                'Authorization': 'Bearer '+sessionStorage.is_security,
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

    render() {
        if (this.state.loading === true && !this.state.data) {
            return <PageLoading />
        }
        console.log(this.state.data)
        return (
            <Fragment>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <h1>Facturas</h1>
                        </div>
                        <FacturasM facturas={this.state.data} fetchDataFacturas={this.fetchDataFacturas} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Facturas;