import React from 'react';
import ReactDOM from 'react-dom';

//TODO: los siguiente import's se haran con react router pero por el momento solo para pruebas se dejara asi 
import AltaLibros from "./pages/AltaLibros";
import Perfiles from './pages/Perfiles';
import Facturas from './pages/Facturas';
import Pedidos from './pages/Pedidos';
import Cotizacion from './pages/Cotizacion';
import App from './App';
//FIXME:verificar como unirlos en react router

import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/*
TODO: template ejemplo para probar los demas
ReactDOM.render(
  <React.StrictMode>
    <AltaLibros />
  </React.StrictMode>,
  document.getElementById('root')
);
FIXME:
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
