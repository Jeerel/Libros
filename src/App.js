import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

import {
  faTimes,
  faTrashAlt,
  faPlus,
  faSearch,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

//const url = "https://localhost:44302/api/empresas/";

class App extends Component {
  state = {
    data: [],
    dataEditorial: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: "",
      nombre: "",
      pais: "",
      capital_bursatil: "",
      tipoModal: "",
    },
  };

  peticionGet = () => {
    let config = {
      method: "GET",
      url: "https://appi-books.herokuapp.com/api/libros",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
        "Content-Type": "application/json",
      },
    };
    axios(config).catch((err) => err);
    let url = "https://appi-books.herokuapp.com/api/libros";
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => { });
  };

  peticionPost = async () => {
    /*delete this.state.form.id;
    console.log(this.state.form);
    this.state.data.push(this.state.form);
    this.modalInsertar();
    this.peticionGet();
    */
    console.log(this.state.form);
    let url = "https://appi-books.herokuapp.com/api/libros";
    axios
      .post(url, this.state.form)
      .then((response) => {
        console.log(response);
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  downloadMARC = (data) => {
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = data.id + ".txt";
    link.href = url;
    link.click();
  };
  peticionPut = () => {
    let url = "https://appi-books.herokuapp.com/api/libros";
    axios.put(url + this.state.form.id, this.state.form).then((response) => {
      this.modalInsertar();
      this.peticionGet();
    });
  };

  peticionDelete = (libro) => {
    console.log(libro);
    swal({
      title: "Deseas eliminar el libro " + libro.titulo + "?",
      text: "No podra recuperar la información",
      icon: "warning",
      buttons: ["Cancelar", "Si, eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let config = {
          method: "DELETE",
          url: "https://appi-books.herokuapp.com/api/libros/" + libro.isbn,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
            "Content-Type": "application/json",
          },
        };
        axios(config).catch((err) => err);
        let url = "https://appi-books.herokuapp.com/api/libros/" + libro.isbn;
        axios
          .delete(url)
          .then((response) => {
            swal("Libro eliminado correctamente", {
              icon: "success",
            });
            this.peticionGet();
          })
          .catch((error) => {
            console.log(error);
            swal("Error en el sistema", {
              icon: "error",
            });
          });
      } else {
        swal("Acción cancelada");
      }
    });
    /*    
    //  axios.delete(url + this.state.form.id).then((response) => {
    this.setState({ modalEliminar: false });    
    //    });
    */
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };
  loadData = () => {
    console.log("ENTRO2");
    let config = {
      method: "GET",
      url: "https://appi-books.herokuapp.com/api/libros",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
        "Content-Type": "application/json",
      },
    };
    axios(config).catch((err) => err);
    let url = "https://appi-books.herokuapp.com/api/libros";
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
        config = {
          method: "GET",
          url: "https://appi-books.herokuapp.com/api/editorial",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
            "Content-Type": "application/json",
          },
        };
        axios(config).catch((err) => err);
        let url = "https://appi-books.herokuapp.com/api/editorial";
        axios
          .get(url)
          .then((response) => {
            this.setState({ dataEditorial: response.data });
          })
          .catch((error) => { });
      })
      .catch((error) => { });
  };
  seleccionarEmpresa = (empresa) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: empresa.id,
        nombre: empresa.nombre,
        pais: empresa.pais,
        capital_bursatil: empresa.capital_bursatil,
      },
    });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/some/valid/uri">
            Navbar
          </a>
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
                <a className="nav-link" href="/some/valid/uri">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/some/valid/uri">
                  Facturas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/some/valid/uri">
                  Perfiles
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="fixed-action-btn">
              <button
                className="btn-floating"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="col-md-6 col-sm-11 rigth">
              <h2>Alta de Libros</h2>
            </div>
            <div className="col-md-6 col-sm-1"></div>
            <div className="col-md-3 col-sm-3">
              <div className="form-group">
                <label>ISSN/ISBN</label>
                <input
                  className="form-control"
                  type="text"
                  name="ISSNFilter"
                  id="ISSNFilter"
                />
              </div>
            </div>
            <div className="col-md-3 col-sm-3">
              <div className="form-group">
                <label>Titulo</label>
                <input
                  className="form-control"
                  type="text"
                  name="TituloLibroFilter"
                  id="TituloLibroFilter"
                />
              </div>
            </div>
            <div className="col-md-3 col-sm-3">
              <div className="form-group">
                <label>Autor</label>
                <input
                  className="form-control"
                  type="text"
                  name="AutorFilter"
                  id="AutorFilter"
                />
              </div>
            </div>
            <div className="col-md-3 col-sm-3">
              <div className="form-group">
                <label>Editorial</label>
                <select className="form-control">
                  <option value="">
                    Seleccione una opción
                  </option>
                  {this.state.dataEditorial.map((editorial, i) => {
                    return (
                      <option key={i} value={editorial.ideditorial}>
                        {editorial.editorialName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label>Año</label>
                <input
                  className="form-control"
                  type="number"
                  name="anioFilter"
                  id="anioFilter"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label>Palabras Clave</label>
                <input
                  className="form-control"
                  type="text"
                  name="palabraClaveFilter"
                  id="palabraClaveFilter"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <button className="btn btn-primary btnTop">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <div className="col-md-12 col-sm-12">
              <table className="table ">
                <thead>
                  <tr>
                    <th>ISBN/ISSN</th>
                    <th>Titulo</th>
                    <th>Editorial(s)</th>
                    <th>Año</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((libro, i) => {
                    return (
                      <tr key={i}>
                        <td>{libro.isbn}</td>
                        <td>{libro.titulo}</td>
                        <td>{libro.editorialName}</td>
                        <td>{libro.anio}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.downloadMARC(libro);
                            }}
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </button>

                          {"   "}
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.peticionDelete(libro);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modalInsertar} className="modal-xl">
          <ModalHeader style={{ display: "block" }}>
            Nuevo Libro
            <span
              style={{ float: "right" }}
              onClick={() => this.modalInsertar()}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </ModalHeader>

          <ModalBody>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label htmlFor="nombre">ISSN/ISBN</label>
                  <input
                    className="form-control"
                    type="text"
                    name="isbn"
                    id="isbn"
                    onChange={this.handleChange}
                    value={form ? form.isbn : ""}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label htmlFor="nombre">Titulo</label>
                  <input
                    className="form-control"
                    type="text"
                    name="titulo"
                    id="titulo"
                    onChange={this.handleChange}
                    value={form ? form.titulo : ""}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label htmlFor="nombre">Autor</label>
                  <input
                    className="form-control"
                    type="text"
                    name="autor"
                    id="autor"
                    onChange={this.handleChange}
                    value={form ? form.autor : ""}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label htmlFor="nombre">Editorial</label>
                  <select
                    className="form-control"
                    name="editorial"
                    id="editorial"
                    onChange={this.handleChange}
                    value={form ? form.editorial : ""}
                  >
                    <option value="">
                      Seleccione una opción
                    </option>
                    {this.state.dataEditorial.map((editorial, i) => {
                      return (
                        <option key={i} value={editorial.ideditorial}>
                          {editorial.editorialName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label htmlFor="nombre">Año</label>
                  <input
                    className="form-control"
                    type="text"
                    name="anio"
                    id="anio"
                    onChange={this.handleChange}
                    value={form ? form.anio : ""}
                  />
                </div>
              </div>
              <div className="col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="nombre">Descripción</label>
                  <textarea
                    className="form-control"
                    name="descripcion"
                    id="descripcion"
                    onChange={this.handleChange}
                    value={form ? form.descripcion : ""}
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => this.peticionPost()}
              className="btn btn-primary"
            >
              Guuardar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default App;
