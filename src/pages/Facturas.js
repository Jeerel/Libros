import React from "react";
import PageLoading from "../components/PageLoading";

class Facturas extends React.Component {
    state = {
        loading: true,
        data: undefined
    }

    render() {
        if (this.state.loading === true && !this.state.data) {
            return <PageLoading />
        }
        return (
            <div>

            </div>
        )
    }
}

export default Facturas;