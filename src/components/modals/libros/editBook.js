import React from "react";
import { Col, Container, Modal, Row, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";

class ModalEditLibro extends React.Component {

    state = {
        form: undefined
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

        let url = "https://appi-books.herokuapp.com/api/libros/" + this.state.form.idLibro;
        let config = {
            method: "PUT",
            url: url,
            headers: {
                'Authorization': 'Bearer '+sessionStorage.is_security,
                "Content-Type": "application/json",
            },
            data: this.state.form
        };
        await axios(config).then((response) => {
            swal("Libro Editado", { icon: "success", });
            this.props.onCloseModal();
            this.props.fetchDataLibros();
        }).catch((error) => {
            swal("Error en el sistema", {
                icon: "error",
            });
        });
    }

    cleanModal = () => {
        this.setState({ form: undefined })
        this.props.onCloseModal();

    }

    fetchDataLibroModalEdit = async () => {

        await this.setState({ form: this.props.data })

    }


    render() {


        if (this.state.form === undefined && this.props.modalIsOpen === true)
            this.fetchDataLibroModalEdit();

        const form = this.state.form;

        return (
            <Modal show={this.props.modalIsOpen} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter"
                centered onHide={this.cleanModal}>
                <Form onSubmit={this.peticionPut}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Editar Libro
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={3}>
                                    <label>
                                        Autor
                                    </label>
                                    <input className="form-control" type="tex" name="autor" id="autor" onChange={this.handleChange} value={form ? form.autor : ''} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        Título
                                    </label>
                                    <input className="form-control" type="tex" name="titulo" id="titulo" onChange={this.handleChange} value={form ? form.titulo : ""} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        Editorial
                                    </label>
                                    <input className="form-control" type="text" name="editorial" id="editorial" onChange={this.handleChange} value={form ? form.editorial : ""} autoComplete="off" required />
                                    {
                                        /*<select
                                            className="form-control"
                                            name="editorial"
                                            id="editorial"
                                            onChange={this.handleChange}
                                            value={form ? form.editorial : ""}
                                            required>
                                            <option value="" selected disabled>Seleccione una opción</option>
                                            {this.props.editoriales.map((editorial, i) => {
                                                return (
                                                    <option key={i} value={editorial.ideditorial}>
                                                        {editorial.editorialName}
                                                    </option>
                                                );
                                            })}
                                        </select>*/
                                    }

                                </Col>
                                <Col xs={12} md={3}>
                                    <label>
                                        ISBN / ISSN
                                    </label>
                                    <input className="form-control" type="tex" name="isbn" id="isbn" onChange={this.handleChange} value={form ? form.isbn : ""} required autoComplete="off" />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>
                                        Lugar de publicación
                                    </label>
                                    <select className="form-control" name="placePub" id="placePubEdit" onChange={this.handleChange} value={form ? form.placePub : ""}>
                                        <option selected disabled value="">Seleccione una opción</option>
                                        <option value="Aguascalientes">Aguascalientes</option>
                                        <option value="Baja California">Baja California</option>
                                        <option value="Baja California Sur">Baja California Sur</option>
                                        <option value="Campeche">Campeche</option>
                                        <option value="Chiapas">Chiapas</option>
                                        <option value="Chihuahua">Chihuahua</option>
                                        <option value="CDMX">Ciudad de México</option>
                                        <option value="Coahuila">Coahuila</option>
                                        <option value="Colima">Colima</option>
                                        <option value="Durango">Durango</option>
                                        <option value="Estado de México">Estado de México</option>
                                        <option value="Guanajuato">Guanajuato</option>
                                        <option value="Guerrero">Guerrero</option>
                                        <option value="Hidalgo">Hidalgo</option>
                                        <option value="Jalisco">Jalisco</option>
                                        <option value="Michoacán">Michoacán</option>
                                        <option value="Morelos">Morelos</option>
                                        <option value="Nayarit">Nayarit</option>
                                        <option value="Nuevo León">Nuevo León</option>
                                        <option value="Oaxaca">Oaxaca</option>
                                        <option value="Puebla">Puebla</option>
                                        <option value="Querétaro">Querétaro</option>
                                        <option value="Quintana Roo">Quintana Roo</option>
                                        <option value="San Luis Potosí">San Luis Potosí</option>
                                        <option value="Sinaloa">Sinaloa</option>
                                        <option value="Sonora">Sonora</option>
                                        <option value="Tabasco">Tabasco</option>
                                        <option value="Tamaulipas">Tamaulipas</option>
                                        <option value="Tlaxcala">Tlaxcala</option>
                                        <option value="Veracruz">Veracruz</option>
                                        <option value="Yucatán">Yucatán</option>
                                        <option value="Zacatecas">Zacatecas</option>
                                    </select>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>
                                        Coordinadores / Antalogadores / Compiladores
                                    </label>
                                    <textarea className="form-control" type="text" onChange={this.handleChange}
                                        name="coordinadores" id="coordinadoresEdit" value={form ? form.coordinadores : ""} />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>
                                        Año de publicación
                                    </label>
                                    <input className="form-control" type="number" name="anio" onChange={this.handleChange}
                                        id="anio" value={form ? form.anio : ""} />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>
                                        Fecha
                                    </label>
                                    <input className="form-control" type="date" name="fecha" onChange={this.handleChange}
                                        id="fechaEdit" value={form ? form.fecha : ""} />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>
                                        Precio
                                    </label>
                                    <input className="form-control" type="number" name="precio" onChange={this.handleChange}
                                        id="precioEdit" value={form ? form.precio : ""} />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>
                                        Número de Factura
                                    </label>
                                    <input className="form-control" type="number" onChange={this.handleChange}
                                        name="numFact" id="numFactEdit" value={form ? form.numFact : ""} />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>
                                        Número de copias en inventario
                                    </label>
                                    <input className="form-control" type="number" onChange={this.handleChange}
                                        name="numCopias" id="numCopyEdit" value={form ? form.numCopias : ""} />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>
                                        Número de páginas
                                    </label>
                                    <input className="form-control" type="number" onChange={this.handleChange}
                                        name="paginas" id="numPagEdit" value={form ? form.paginas : ""} />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>
                                        Dimensiones (Largo-Ancho-Alto) [cm]
                                    </label>
                                    <input className="form-control" type="text" onChange={this.handleChange}
                                        name="dimensiones" id="dimensionesEdit" value={form ? form.dimensiones : ""} />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>Colección / Serie</label>
                                    <input className="form-control" type="text" onChange={this.handleChange}
                                        name="coleccionSerie" id="coleccionSerieEdit" value={form ? form.coleccionSerie : ""} />
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <label>Tema</label>
                                    <input className="form-control" type="text" onChange={this.handleChange}
                                        name="tema" id="temaEdit" value={form ? form.tema : ""} />
                                </Col>
                                <Col xs={12} md={12} className="mt-3">
                                    <label>Nota Bibliográfica</label>
                                    <textarea className="form-control" name="nota" id="notaEdit"
                                        value={form ? form.nota : ""} onChange={this.handleChange} rows="3" />
                                </Col>
                                <Col xs={12} md={12} className="mt-3">
                                    <label>Descripción</label>
                                    <textarea className="form-control" name="descripcion" id="descripcionEdit"
                                        value={form ? form.descripcion : ""} onChange={this.handleChange} rows="3" />
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="submit"
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

export default ModalEditLibro;