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
    //NavbarText
} from "reactstrap";
import "../App.css"

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
                            <Link className="nav-link" to="/clientes">
                                Clientes
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/perfiles">
                                Perfiles
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>

        </div>
    );


}

export default NavbarC;