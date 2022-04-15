import React from "react";
import { Col, Container, Modal, Row, Form, Button, FloatingLabel } from "react-bootstrap";
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
                'Authorization': 'Bearer ' + sessionStorage.is_security,
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
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Autor">
                                        <Form.Control
                                            type="text"
                                            placeholder="Autor"
                                            value={form ? form.autor : ""}
                                            name="autor"
                                            onChange={this.handleChange} required />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Título">
                                        <Form.Control
                                            type="text"
                                            placeholder="Título"
                                            value={form ? form.titulo : ""}
                                            name="titulo"
                                            onChange={this.handleChange} required />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Editorial">
                                        <Form.Control
                                            type="text"
                                            placeholder="Editorial"
                                            value={form ? form.editorial : ""}
                                            name="editorial"
                                            onChange={this.handleChange} required />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="ISBN">
                                        <Form.Control
                                            type="text"
                                            placeholder="ISBN"
                                            value={form ? form.isbn : ""}
                                            name="isbn"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="ISSN">
                                        <Form.Control
                                            type="text"
                                            placeholder="ISSN"
                                            value={form ? form.issn : ""}
                                            name="issn"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">

                                    <FloatingLabel
                                        controlId="floatingSelect"
                                        label="Lugar de publicación">
                                        <Form.Select aria-label="Floating label" value={form ? form.placePub : ""} onChange={this.handleChange} name="placePub">
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
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Tema">
                                        <Form.Control
                                            type="text"
                                            placeholder="Tema"
                                            value={form ? form.tema : ""}
                                            name="tema"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Año de publicación">
                                        <Form.Control
                                            type="number"
                                            placeholder="Año de publicación"
                                            value={form ? form.anio : ""}
                                            name="anio"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Precio">
                                        <Form.Control
                                            type="number"
                                            placeholder="Precio"
                                            step="0.01"
                                            value={form ? form.precio : ""}
                                            name="precio"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Número de páginas">
                                        <Form.Control
                                            type="number"
                                            placeholder="Número de páginas"
                                            value={form ? form.paginas : ""}
                                            name="paginas"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Dimensiones (cm)">
                                        <Form.Control
                                            type="text"
                                            placeholder="Dimensiones (cm)"
                                            value={form ? form.dimensiones : ""}
                                            name="dimensiones"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Colección / Serie">
                                        <Form.Control
                                            type="text"
                                            placeholder="Colección / Serie"
                                            value={form ? form.coleccionSerie : ""}
                                            name="coleccionSerie"
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={5} className="mt-3">
                                    <FloatingLabel
                                        controlId="floatingTextarea"
                                        label="Coordinadores / Antalogadores / Compiladores">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Coordinadores / Antalogadores / Compiladores"
                                            value={form ? form.coordinadores : ""}
                                            name="coordinadores"
                                            style={{ height: '100px' }}
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={3} className="mt-3">
                                    <FloatingLabel
                                        controlId="floatingTextarea"
                                        label="Nota Bibliográfica">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Nota Bibliográfica"
                                            value={form ? form.nota : ""}
                                            name="nota"
                                            style={{ height: '100px' }}
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={4} className="mt-3">

                                    <FloatingLabel
                                        controlId="floatingTextarea"
                                        label="Descripción">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Descripción"
                                            value={form ? form.descripcion : ""}
                                            name="descripcion"
                                            style={{ height: '100px' }}
                                            onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type="submit"
                            variant="btn btn-primary">
                            Guardar
                        </Button>
                        <Button
                            variant="btn btn-danger"
                            onClick={this.cleanModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }

}

export default ModalEditLibro;