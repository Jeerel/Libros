import React from "react";
import { Col, Container, Modal, Row, Form, Table, Button, Badge, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faHashtag, faMinus } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import axios from "axios";

class ModalEditarCotizacion extends React.Component {

    state = {
        form: undefined,
        dataClientes: undefined,
        dataLibros: undefined,
        arrayCotizacionLibros: []
    }

    handleChange = async (e) => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };


    peticionPut = async (event) => {
        event.preventDefault();
        //preparamos la informacion que deseamos enviar
        let auxArray = this.state.arrayCotizacionLibros;
        //iteramos el auxiliar del array de libros de la cotizacion
        for (let i = 0; i < auxArray.length; i++) {
            //asignamos a variables temporales para reasginar valores
            const idLibro = auxArray[i].idLibro;
            const cantidad = auxArray[i].cantidad;
            const precio = auxArray[i].precio;
            //creamos la nueva estructura del objeto del array
            auxArray[i] = {
                "idLibro": idLibro,
                "cantidad": cantidad,
                "precio": precio
            };
        }
        //fin del for

        //creamos la estructura a enviar
        let data = {
            "idCliente": this.state.form.cliente, //obtenemos el cliente del state 
            "datos": auxArray //le pasamos el nuevo array
        }

        const url = "https://appi-books.herokuapp.com/api/cotizaciones/";
        let config = {
            method: "PUT",
            url: url,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.is_security,
                "Content-Type": "application/json",
            },
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.succes) {
                    console.log(response)
                    /*
                    this.props.onCloseModal();
                    this.props.fetchDataCotizaciones();
                    this.props.fetchDataClientes();
                    this.props.fetchDataLibros();
                    */
                }

            })
            .catch((error) => {
                return error;
            });
    }


    cleanModal = async () => {
        await this.setState({
            form: undefined, arrayCotizacionLibros: null
        });
        await this.props.onCloseModal();
    }

    fetchDataCotizacionesModalEdit = async () => {

        await this.setState({
            form: {
                cliente: this.props.data.dataCliente[0].id_cliente
            }, arrayCotizacionLibros: this.props.data.dataLibros
        })
        //console.log('LO QUE TIENE DE ARRAY LIBROS: ', this.props.data.dataLibros)
    }

    poniendoUndefined = async () => {
        await this.setState({ form: undefined })
    }

    render() {

        if (this.state.form === undefined && this.props.modalIsOpen === true) {
            this.fetchDataCotizacionesModalEdit()
        } else if ((this.state.form !== undefined || this.state.form != null) && this.props.modalIsOpen === false) {
            this.poniendoUndefined()
        }

        //funcion para eliminar del array el libro seleccionado
        const popLibro = async (index) => {
            let auxArray = this.state.arrayCotizacionLibros; //declaramos un arreglo auxiliar
            auxArray.splice(index, 1); //eliminamos el elemento del index que estamos pasando
            //vaciamos la info nueva en el estado

            //preguntamos por el tamaño del arreglo para hacer que presente de nuevo el mensaje del alert
            auxArray.length === 0 ?
                await this.setState({
                    ...this.state,
                    arrayCotizacionLibros: null
                }) :
                await this.setState({
                    ...this.state,
                    arrayCotizacionLibros: auxArray
                });

        }
        //fin de la funcion de eliminar del arreglo el libro

        const pushLibro = async (libro) => {

            if (this.state.arrayCotizacionLibros) { //preguntamos si esta vacio el arreglo de libros - cotizacion

                let noExiste = true;
                //for para iterar sobre el array que tenemos y comprobar que no tenemos mas de un libro repetido en el array
                for (let i = 0; i < this.state.arrayCotizacionLibros.length; i++) {
                    //validamos que si existe el mismo libro aumente 1 en su contador 
                    if (this.state.arrayCotizacionLibros[i].idLibro === libro.idLibro) {

                        noExiste = false;
                        let auxArray = this.state.arrayCotizacionLibros;
                        auxArray[i].cantidad = auxArray[i].cantidad + 1;

                        await this.setState({
                            ...this.state,
                            arrayCotizacionLibros: auxArray
                        });
                        break;
                    }
                }
                if (noExiste) {
                    libro.cantidad = 1;
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
                libro.cantidad = 1;
                await this.setState({ //si no hay datos entonces usaremos este set state
                    ...this.state,
                    arrayCotizacionLibros: [
                        libro
                    ]
                });
            }
        }

        //funcion para restar libros, al libro seleccionado del array 
        const substractCantidad = async (index) => {
            let auxArray = this.state.arrayCotizacionLibros; //declaramos un arreglo auxiliar
            //hacemos la operacion de restar una unidad
            auxArray[index].cantidad = auxArray[index].cantidad - 1;
            //pasamos el auxiliar al array del estado
            await this.setState({
                ...this.state,
                arrayCotizacionLibros: auxArray
            });
        }
        //fin de la funcion

        const form = this.state.form

        console.log('STATE: ', this.state)
        console.log(this.props)

        return (
            <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter"
                centered onHide={this.cleanModal}>
                <Form onSubmit={this.peticionPut}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Editar Cotización
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={3}>
                                    <label>
                                        Cliente
                                    </label>

                                    <select className="form-control mt-2" name="cliente" id="cliente" value={form ? form.cliente : ""} onChange={this.handleChange} required>
                                        <option value="" selected disabled>Seleccione una opción</option>
                                        {this.props.dataCliente.map((cliente, i) => {
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
                                                                    <p>
                                                                        <FontAwesomeIcon icon={faHashtag} /> Libros <Badge bg="dark">{libro.cantidad}</Badge> {
                                                                            libro.cantidad > 1 ? <Button variant="outline-danger" size="sm" onClick={() => substractCantidad(index)}> <FontAwesomeIcon icon={faMinus} /></Button> : null
                                                                        }
                                                                    </p>
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
                                            {this.props.dataLibro.map((libro, i) => {
                                                return (
                                                    <tr>
                                                        <td>{libro.titulo}</td>
                                                        <td>{libro.autor}</td>
                                                        <td>{libro.editorial}</td>
                                                        <td>{libro.isbn}</td>
                                                        <td>{libro.numCopias}</td>
                                                        <td>
                                                            <Button variant="success" size="sm" onClick={() => { pushLibro(libro); }}>
                                                                {/* onClick={() => { pushLibro(libro); }} */}
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
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Guardar
                        </Button>
                        <Button variant="danger" onClick={this.cleanModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }

}

export default ModalEditarCotizacion;