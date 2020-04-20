import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { register } from "../../services/accountsService";
import auth from "../../services/authService";
import logo_pccc from "../../media/fire-station1.svg";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "", repassword: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().email().required().label("Địa Chỉ Email"),
    password: Joi.string().min(8).required().label("Mật Khẩu"),
    repassword: Joi.valid(Joi.ref("password"))
      .options({
        language: {
          any: {
            allowOnly: "Phải Trùng Nhau",
          },
        },
      })
      .label("Xác Nhận Mật Khẩu"),
    name: Joi.string().min(5).required().label("Username"),
  };

  doSubmit = async () => {
    try {
      //bảo người dùng đi verify bằng mail
      const { data } = await register(this.state.data);
      if (data) {
        toast(
          "Tài khoản đã được tạo. Hãy kiểm tra email của bạn để xác nhận trước khi đăng nhập",
          {
            type: toast.TYPE.INFO,
            onClose: () => (window.location = "/signin"),
          }
        );
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = "Địa chỉ email đã được sử dụng";
        this.setState({ errors });
      }
    }
  };
  render() {
    //in case of user already logged in => redirect them to homepage
    if (auth.isAuthenticated()) return <Redirect to="/" />;
    document.title = "Đăng Ký Vào Hệ Thống";
    return (
      <React.Fragment>
        <div className="form-signin">
          <div className="text-center">
            <img className="logo" src={logo_pccc} alt="efrs-logo" />
          </div>
          <h3 className="font-weight-normal text-center mb-4">Đăng Ký</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Địa Chỉ Email", "text")}
            {this.renderInput("name", "Username", "text")}
            {this.renderInput("password", "Mật Khẩu", "password")}
            {this.renderInput("repassword", "Xác Nhận Mật Khẩu", "password")}
            {this.renderButton("Đăng Ký")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
