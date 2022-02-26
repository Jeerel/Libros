import React, { Fragment } from "react";
import swal from "sweetalert";
import axios from "axios";

class Login extends React.Component {
    state = {
        form: {},
        loading: false
    }
    handleChange= async (e) => {
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
        var data = JSON.stringify(this.state.form);
          
          var config = {
            method: 'post',
            url: 'https://appi-books.herokuapp.com/api/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
              console.log(response)
              var responseData=response.data;
              console.log(responseData)
              if(responseData.error){
                swal( responseData.mess, {
                    icon: "error",
                });
              }else{
                sessionStorage.is_Emial = responseData.is_Emial;
                sessionStorage.is_Name= responseData.is_Name;
                sessionStorage.is_Profile= responseData.is_Profile;
                sessionStorage.is_security= responseData.is_security;
                swal(responseData.mess, {
                    icon: "success",
                });
                setTimeout(function(){
                    window.location="/libros"
                },2000)
              }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <Fragment>
                <div class="login">
                    <h1>Inicio de sesión</h1>
                    <form onSubmit={this.login}>
                        <input type="email" name="email" class="loginInput" placeholder="Correo" onChange={this.handleChange} required="required" />
                        <input type="password" name="pass" class="loginInput" placeholder="Contraseña" onChange={this.handleChange} required="required" />
                        <button type="submit" class="btn btn-primary btn-block btn-large">Iniciar sesión</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default Login;