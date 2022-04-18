import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AltaLibros from "./pages/AltaLibros";
import Clientes from "./pages/Clientes"
import Perfiles from './pages/Perfiles';
import Factura from './pages/Facturas';
import restPassword from './pages/restPasss';
import newPassword from './pages/newPassword';
import Pedidos from './pages/Pedidos';
import Cotizacion from './pages/Cotizacion';
import Login from './pages/Login'
import Pruebas from "./pages/Pruebas";


import Layout from "./components/Layout";

function App() {

    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/libros" component={AltaLibros} />
                    <Route exact path="/clientes" component={Clientes} />
                    <Route exact path="/restPassword" component={restPassword} />
                    <Route exact path="/newPassword" component={newPassword} />
                    {
                        //<Route exact path="/editoriales" component={Editoriales} />
                    }
                    <Route exact path="/perfiles" component={Perfiles} />
                    {
                        //<Route exact path="/pedidos" component={Pedidos} />
                    }
                    <Route exact path="/facturas" component={Factura} />
                    {
                        //<Route exact path="/facturas" component={Cotizacion} />
                        //<Route exact path="/pruebas" component={Pruebas} />
                    }
                </Switch>
            </Layout>
        </BrowserRouter>
    );

}

export default App;