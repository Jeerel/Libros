import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import axios from "axios";
import "./styles/loginStyle.css"
import "../App.css"

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
        event.preventDefault();
        var data = this.state.form;

        var config = {
            method: 'post',
            url: 'https://appi-books.herokuapp.com/api/login',
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
                    sessionStorage.is_Emial = responseData.body.is_Emial;
                    sessionStorage.is_Name = responseData.body.is_Name;
                    sessionStorage.is_Profile = responseData.body.is_Profile;
                    sessionStorage.is_security = responseData.body.is_security;
                    swal(responseData.body.mess, {
                        icon: "success",
                    });
                    setTimeout(function () {
                        window.location = "/libros"
                    }, 2000)
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("error");
            });
    }

    render() {
        
        return (
            <Fragment>
                 <div class="container-fluid vh-100">
            <div class="login2">
                <div class="rounded d-flex justify-content-center">
                    <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
                        <div class="text-center">
                            <h3 class="text-primary">Iniciar sesión</h3>
                        </div>
                        <form onSubmit={this.login}>
                            <div class="p-4">
                                <div class="input-group mb-3">
                                    <span class="input-group-text bg-primary text-white"><FontAwesomeIcon icon={faUser} /></span>
                                    <input type="email" name="email" class="form-control" placeholder="Correo" onChange={this.handleChange} required="required" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text bg-primary text-white"><FontAwesomeIcon icon={faKey} /></span>
                                    <input type="password" name="pass" class="form-control" placeholder="Contraseña" onChange={this.handleChange} required="required" />
                                </div>
                                {/* <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Remember Me
                                    </label>
                                </div> */}
                                <button class="btn btn-primary text-center mt-2" type="submit">
                                    Iniciar
                                </button>
                                <p class="text-center text-primary">Olvidaste tu contraseña?</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
               {/*  <div class="login">
                    <h1>Inicio de sesión</h1>
                    <form onSubmit={this.login}>
                        <input type="email" name="email" class="loginInput" placeholder="Correo" onChange={this.handleChange} required="required" />
                        <input type="password" name="pass" class="loginInput" placeholder="Contraseña" onChange={this.handleChange} required="required" />
                        <button type="submit" class="btn btn-primary btn-block btn-large">Iniciar sesión</button>
                    </form>
                </div> */}
            </Fragment>
        )
    }
}

export default Login;