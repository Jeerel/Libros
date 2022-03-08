import React from "react";
import { Col, Container, Modal, Row, Form, Table, Button, Badge, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faHashtag } from "@fortawesome/free-solid-svg-icons";
//import axios from "axios";

class ModalAddCotizacion extends React.Component {

    state = {
        form: {
            dataClientes: this.props.clientes,
            dataLibros: this.props.libros,
            arrayCotizacionLibros: []
        }
    }

    /*handleChange = async (e) => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };*/

    /*peticionPost = async (event) => {
        event.preventDefault();
        const url = "https://appi-books.herokuapp.com/api/libros";
        let config = {
            method: "POST",
            url: url,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1Mjc5MTcwLCJleHAiOjE2NDUzMDc5NzB9.HWcMBHnPQpWH7O7vsvNuXnWQJob8Q4LLz6_grOnSFRU',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            data: this.state.form
        };
        axios(config)
            .then((response) => {

                if (response.data === 'Enviado') {
                    this.props.onCloseModal();
                    this.props.fetchDataLibros();
                }

            })
            .catch((error) => {
                return error;
            });
    }*/

    cleanModal = async () => {
        await this.setState({ form: {} });
        this.props.onCloseModal();
    }

    render() {

        //const [arrayCotizacionLibros, setArrayCotizacionLibros] = useState([]);

        const popLibro = async (index) => {
            let auxArray = this.state.arrayCotizacionLibros; //declaramos un arreglo auxiliar
            auxArray.splice(index, 1); //eliminamos el elemento del index que estamos pasando
            //vaciamos la info nueva en el estado

            /*
            TODO:
            - Hacer validacion de cuando no hay mas datos en aux array borrar this.state.arrayCotizacionLibros para
              mostrar de nuevo el alert de insertar libros
            FIXME:
            */
            await this.setState({
                ...this.state,
                arrayCotizacionLibros: auxArray
            });

            console.log(typeof this.state.arrayCotizacionLibros, this.state.arrayCotizacionLibros)
        }

        const pushLibro = async (libro) => {

            if (this.state.arrayCotizacionLibros) { //preguntamos si esta vacio el arreglo de libros - cotizacion

                let noExiste = true;
                //for para iterar sobre el array que tenemos y comprobar que no tenemos mas de un libro repetido en el array
                for (let i = 0; i < this.state.arrayCotizacionLibros.length; i++) {
                    //validamos que si existe el mismo libro aumente 1 en su contador 
                    if (this.state.arrayCotizacionLibros[i].idLibro === libro.idLibro) {

                        noExiste = false;
                        let auxArray = this.state.arrayCotizacionLibros;
                        auxArray[i].count = auxArray[i].count + 1;

                        await this.setState({
                            ...this.state,
                            arrayCotizacionLibros: auxArray
                        });
                        break;
                    }
                }
                if (noExiste) {
                    libro.count = 1;
                    //y lo guardamos en el array del state de coti libros
                    await this.setState({
                        ...this.state,
                        arrayCotizacionLibros: [
                            ...this.state.arrayCotizacionLibros,
                            libro
                        ]
                    });
                }

            } else {
                libro.count = 1;
                await this.setState({ //si no hay datos entonces usaremos este set state
                    ...this.state,
                    arrayCotizacionLibros: [
                        libro
                    ]
                });
            }
        }

        const form = this.state.form

        return (
            <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter"
                centered onHide={this.cleanModal}>
                <Form onSubmit={this.peticionPost}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Nueva Cotización
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={3}>
                                    <label>
                                        Cliente
                                    </label>
                                    <select className="form-control mt-2" name="cliente" id="cliente" value={form ? form.cliente : ""} onChange={this.handleChange}>
                                        <option value="" selected disabled>Seleccione una opción</option>
                                        {this.props.clientes.map((cliente, i) => {
                                            return (
                                                <option key={i} value={cliente.idcliente}>
                                                    {cliente.nombre}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        Libros seleccionados
                                    </label>
                                    <Col md={12} className="mt-3">
                                        <div className="d-grid gap-2">
                                            {
                                                this.state.arrayCotizacionLibros ?
                                                    this.state.arrayCotizacionLibros.map((libro, index) => {
                                                        return (

                                                            <Alert variant="info">
                                                                <div className="d-flex">
                                                                    <div className="pl-2">
                                                                        <p>
                                                                            {libro.titulo}
                                                                        </p>
                                                                    </div>
                                                                    <div className="ml-auto mt-auto p-2">
                                                                        <Button className="justify-content-end" size="sm" onClick={() => popLibro(index)} variant="outline-danger">
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <div className="d-flex justify-content-start">
                                                                    <p><FontAwesomeIcon icon={faHashtag} /> Libros <Badge bg="dark">{libro.count}</Badge></p>
                                                                </div>
                                                            </Alert>
                                                        )
                                                    }) :
                                                    <Alert variant="warning"><p>No hay libros en esta cotización, seleccione los libros que desea agregar a la cotización de la tabla siguiente.</p></Alert>
                                            }
                                        </div>
                                    </Col>
                                </Col>
                                <Col xs={12} md={6}>
                                    <label>
                                        Libros dentro de Stock
                                    </label>
                                    <Table className="mt-3" responsive>
                                        <thead>
                                            <tr>
                                                <th>Título</th>
                                                <th>Autor</th>
                                                <th>Editorial(es)</th>
                                                <th>ISBN / ISSN</th>
                                                <th>Stock</th>
                                                <th>Agregar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.libros.map((libro, i) => {
                                                return (
                                                    <tr>
                                                        <td>{libro.titulo}</td>
                                                        <td>{libro.autor}</td>
                                                        <td>{libro.editorial}</td>
                                                        <td>{libro.isbn}</td>
                                                        <td>{libro.numCopias}</td>
                                                        <td>
                                                            <Button variant="success" size="sm" onClick={() => { pushLibro(libro); }}>
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="btn btn-primary">
                            Guardar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={this.cleanModal}>
                            Cancelar
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }

}

export default ModalAddCotizacion;