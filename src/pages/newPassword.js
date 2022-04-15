import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import axios from "axios";
import "./styles/loginStyle.css"
import "../App.css"
//jVFLUrLpK
class Login extends React.Component {
    state = {
        form: {},
        loading: false
    }
    handleChange = async (e) => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    }

    login = async (event) => {
        console.log(this.state.form)
        if (this.state.form.newPass == this.state.form.repeatPass) {

            event.preventDefault();
            var data = this.state.form;

            var config = {
                method: 'post',
                url: 'https://appi-books.herokuapp.com/api/resetPassword',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(response)
                    var responseData = response.data;
                    console.log(responseData)
                    if (responseData.error) {
                        swal(responseData.body.mess, {
                            icon: "error",
                        });
                    } else {
                        swal(responseData.body.mess, {
                            icon: "success",
                        }).then(() => {
                            sessionStorage.is_Emial = responseData.body.is_Emial;
                            sessionStorage.is_Name = responseData.body.is_Name;
                            sessionStorage.is_Profile = responseData.body.is_Profile;
                            sessionStorage.is_security = responseData.body.is_security;
                            window.location = "/libros"
                            //window.location = "/changePass"
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    console.log("error");
                });
        } else {
            swal("La contraseña no es la misma", {
                icon: "error",
            });
        }
    }

    render() {

        return (
            <Fragment>
                <div class="container-fluid vh-100">
                    <div class="login2">
                        <div class="rounded d-flex justify-content-center">
                            <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
                                <div class="text-center">
                                    <h3 class="text-primary">Nueva contraseña</h3>
                                </div>
                                <form onSubmit={this.login}>
                                    <div class="p-4">
                                        <div class="input-group mb-3">
                                            <span class="input-group-text bg-primary text-white"><FontAwesomeIcon icon={faUser} /></span>
                                            <input type="email" name="email" class="form-control" placeholder="Correo" onChange={this.handleChange} required="required" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text bg-primary text-white"><FontAwesomeIcon icon={faKey} /></span>
                                            <input type="password" name="oldPass" class="form-control" placeholder="Contraseña enviada" onChange={this.handleChange} required="required" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text bg-primary text-white"><FontAwesomeIcon icon={faKey} /></span>
                                            <input type="password" name="newPass" class="form-control" placeholder="Nueva Contraseña" onChange={this.handleChange} required="required" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text bg-primary text-white"><FontAwesomeIcon icon={faKey} /></span>
                                            <input type="password" name="repeatPass" class="form-control" placeholder="Repetir Contraseña" onChange={this.handleChange} required="required" />
                                        </div>
                                        <div className="col-md-12 col-xs-12">
                                            <div className="d-grid gap-2">
                                                <button class="btn btn-primary text-center mt-2" type="submit">
                                                    Enviar correo
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login;