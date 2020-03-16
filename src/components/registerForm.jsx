import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/accountsService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };
  doSubmit = async () => {
    try {
      const { headers } = await userService.register(this.state.data);
      auth.loginWithJwt(headers["x-auth-token"]);
      //cause the full reload page => read the jwt => display info of user properly
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1 className="container">Register</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "text")}
          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
