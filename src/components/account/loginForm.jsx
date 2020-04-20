import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../../services/authService";
import { Redirect } from "react-router-dom";
import logo_pccc from "../../media/fire-station1.svg";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Địa Chỉ Email"),
    password: Joi.string().required().label("Mật Khẩu"),
  };

  doSubmit = async () => {
    //call the server
    try {
      const { email, password } = this.state.data;
      await auth.login(email, password);
      if (!auth.isSupervisor() && !auth.isAdmin()) {
        toast(
          "Tài khoản chưa được kích hoạt. Hiện tại bạn chưa có quyền truy cập các chức năng của hệ thống. Hãy đợi quản trị viên chấp thuận",
          {
            type: toast.TYPE.SUCCESS,
            onClose: () => {
              return (window.location = "/profile");
            },
          }
        );
      } else {
        //get the previous page before redirected to /login
        const { state } = this.props.location;
        //cause the full reload page => read the jwt => display info of user properly
        window.location = state ? state.from.pathname : "/";
      }
    } catch (ex) {
      if (ex.response) {
        const { status } = ex.response;
        if (status === 401 || status === 400 || status === 404) {
          const errors = { ...this.state.errors };
          if (status === 401)
            errors.email =
              "Tài khoản của bạn chưa được xác thực, hãy kiểm tra email để hoàn tất xác thực";
          else errors.email = "Email hoặc mật khẩu không đúng";
          this.setState({ errors });
        }
      }
    }
  };

  render() {
    //in case of user already logged in => redirect them to homepage
    if (auth.isAuthenticated()) return <Redirect to="/" />;
    document.title = "Đăng Nhập Vào Hệ Thống";
    return (
      <React.Fragment>
        <div className="form-signin">
          <div className="text-center">
            <img className="logo" src={logo_pccc} alt="efrs-logo" />
          </div>
          <h3 className="font-weight-normal text-center mb-4">Đăng Nhập</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Địa Chỉ Email", "text")}
            {this.renderInput("password", "Mật Khẩu", "password")}
            {this.renderButton("Đăng Nhập")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
