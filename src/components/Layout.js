import React from "react";
import NavbarC from "./NavbarC";

function Layout(props) {

    const children = props.children

    return (
        <React.Fragment>
            <NavbarC />
            {children}
        </React.Fragment>
    )

}

export default Layout;