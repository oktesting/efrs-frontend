import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../../services/authService";
import { changePassword } from "../../services/accountsService";
import { toast } from "react-toastify";
import loadingLogo from "../../media/fireman-helmet.svg";
import LoadingScreen from "react-loading-screen";

class ChangePassForm extends Form {
  state = {
    data: {
      password: "",
      repassword: "",
    },
    loading: true,
    errors: {},
    account: auth.getCurrentUser(),
  };

  async componentDidMount() {
    this.setState({ loading: false });
  }
  schema = {
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
  };

  doSubmit = async () => {
    try {
      const token = this.props.match.params.token;
      await changePassword(token, this.state.data.repassword);
      toast(
        "Đã thay đổi mật khẩu thành công. Hãy đăng nhập lại bằng mật khẩu mới",
        {
          type: toast.TYPE.SUCCESS,
          onClose: () => {
            auth.logout();
            return window.close();
          },
        }
      );
    } catch (ex) {
      return this.props.history.replace("/not-found");
    }
  };

  render() {
    return (
      <LoadingScreen
        loading={this.state.loading}
        bgColor="#f1f1f1"
        spinnerColor="#51c2e0"
        textColor="#676767"
        logoSrc={loadingLogo}
        text="Đang Tải Thông Tin Cá Nhân"
      >
        <div className="form-signin">
          <h3 className="font-weight-normal text-center mb-4">
            Thay Đổi Mật Khẩu
          </h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("password", "Mật Khẩu Mới", "password")}
            {this.renderInput(
              "repassword",
              "Xác Nhận Mật Khẩu Mới",
              "password"
            )}
            {this.renderButton("Thay Đổi")}
          </form>
        </div>
      </LoadingScreen>
    );
  }
}

export default ChangePassForm;
