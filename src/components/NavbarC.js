import React, { useState } from "react";
import { Link } from "react-router-dom";
import LibrosImg from "../images/libros_logo.png"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarText
} from "reactstrap";
import "../App.css"
/*
TODO:
-Se cambio el etiquetado <a></a> por <Link></Link>
-Se cambio href por to
*/

const NavbarC = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <img src={LibrosImg} className="logoLibros" alt="Logo de libros de todo mexico" />
                <NavbarBrand>
                    <Link className="nav-link black-type" to="/">
                        Libros de Todo México
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/libros">
                                Libros
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/editoriales">
                                Editoriales
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/perfiles">
                                Perfiles
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/cotizacion">
                                Cotización
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/facturas">
                                Facturas
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/pedidos">
                                Pedidos
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {/*<nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                        <img src={LibrosImg} className="logoLibros" alt="Logo de libros de todo mexico" />
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/alta/libros">
                                    Alta de libros
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/editoriales">
                                    Editoriales
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
        */}
        </div>
    );


}

export default NavbarC;