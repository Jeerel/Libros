import React from "react";
import { Link } from "react-router-dom";
/*
TODO:
-Se cambio el etiquetado <a></a> por <Link></Link>
-Se cambio href por to
*/

class Navbar extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/alta/libros">
                        Navbar
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/alta/libros">
                                    Alta de libros
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/perfiles">
                                    Perfiles
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pedidos">
                                    Pedidos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cotizacion">
                                    Cotización
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/facturas">
                                    Facturas
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }

}

export default Navbar;