import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/accountsService";
import logo_pccc from "../media/logo_pccc.svg";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "", repassword: "" },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email Address"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    repassword: Joi.valid(Joi.ref("password"))
      .options({
        language: {
          any: {
            allowOnly: "must be matched."
          }
        }
      })
      .label("Password Confirmation"),
    name: Joi.string()
      .required()
      .label("Profile Name")
  };

  doSubmit = async () => {
    try {
      //bảo người dùng đi verify bằng mail
      const { data } = await register(this.state.data);
      if (data) {
        toast(
          "Your account is created. Please check your email inbox to verify then sign in",
          {
            type: toast.TYPE.INFO,
            onClose: () => (window.location = "/signin"),
            onClick: () => (window.location = "/signin")
          }
        );
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="form-signin">
          <div className="text-center">
            <img className="logo" src={logo_pccc} alt="efrs-logo" />
          </div>
          <h3 className="font-weight-normal text-center mb-4">Sign Up</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email Address", "text")}
            {this.renderInput("name", "Profile Name", "text")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput(
              "repassword",
              "Password Confirmation",
              "password"
            )}
            {this.renderButton("Register")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
