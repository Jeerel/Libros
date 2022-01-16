import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AltaLibros from "./pages/AltaLibros";
import clientes from "./components/clientes/Clientes"
import Perfiles from './pages/Perfiles';
import Facturas from './pages/Facturas';
import Pedidos from './pages/Pedidos';
import Cotizacion from './pages/Cotizacion';
import Editoriales from "./pages/Editoriales";
import Pruebas from "./pages/Pruebas";

import Layout from "./components/Layout";

/*
TODO:
-Tendremos que pasarle los parametros de redireccion en el navbar

FIXME:
-Para acceder a las vistas ahora sera de esta manera: la localhost acompañado del route que le dimos aqui, ejemplo:
http://localhost:3000/facturas
*/

function App() {

    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/libros" component={AltaLibros} />
                    <Route exact path="/clientes" component={clientes} />
                    <Route exact path="/editoriales" component={Editoriales} />
                    <Route exact path="/perfiles" component={Perfiles} />
                    <Route exact path="/pedidos" component={Pedidos} />
                    <Route exact path="/cotizacion" component={Cotizacion} />
                    <Route exact path="/facturas" component={Facturas} />
                    <Route exact path="/pruebas" component={Pruebas} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );

}

export default App;