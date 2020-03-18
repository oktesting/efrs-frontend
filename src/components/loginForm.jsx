import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import logo_pccc from "../media/logo_pccc.svg";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email Address"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    //call the server
    try {
      const { email, password } = this.state.data;
      await auth.login(email, password);
      const acc = auth.getCurrentUser();
      if (acc && !acc["supervisor"]) window.location = "/profile";
      else {
        //get the previous page before redirected to /login
        const { state } = this.props.location;
        //cause the full reload page => read the jwt => display info of user properly
        window.location = state ? state.from.pathname : "/";
      }
    } catch (ex) {
      const { status } = ex.response;
      if (ex.response && (status === 400 || status === 401 || status === 404)) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    //in case of user already logged in => redirect them to homepage
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <div className="form-signin">
          <div className="text-center">
            <img className="logo" src={logo_pccc} alt="efrs-logo" />
          </div>
          <h3 className="font-weight-normal text-center mb-4">Sign In</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email Address", "text")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
