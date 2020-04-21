import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../../services/authService";
import { requestResetPassword } from "../../services/accountsService";
import { getAllFireStation } from "../../services/locationService";
import {
  createSupervisor,
  getSupervisor,
  editSupervisor,
} from "../../services/supervisorService";
import { toast } from "react-toastify";
import { getResizedImage } from "../../utils/getImage";
import loadingLogo from "../../media/fireman-helmet.svg";
import LoadingScreen from "react-loading-screen";

class ProfileForm extends Form {
  state = {
    data: {
      fullname: "",
      phone: "",
      gender: "",
      location: "",
      avatar: "",
    },
    genders: [
      {
        _id: "male",
        name: "Nam",
      },
      {
        _id: "female",
        name: "Nữ",
      },
    ],
    fireStations: [],
    errors: {},
    account: auth.getCurrentUser(),
    avatarInput: null,
    loading: true,
  };

  async populateFireStation() {
    // gọi tới server để kéo về mảng fire stations
    const { data: fireStations } = await getAllFireStation();
    this.setState({ fireStations });
  }
  async populatingSupervisor() {
    try {
      const { account } = this.state;
      //create new super case
      if (!account.supervisor) return;
      //edit super case
      const { data } = await getSupervisor(account._id);
      this.setState({ data: this.mapToViewModel(data.supervisor) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(supervisor) {
    return {
      _id: supervisor._id,
      isActivated: supervisor.isActivated,
      fullname: supervisor.fullname,
      phone: supervisor.phone,
      gender: supervisor.gender,
      location: supervisor.location,
      avatar: supervisor.avatar,
    };
  }

  fileSelectedHandler = (event) => {
    this.setState({ avatarInput: event.target.files[0] });
  };

  async componentDidMount() {
    await this.populateFireStation();
    await this.populatingSupervisor();
    this.setState({ loading: false });
  }

  schema = {
    _id: Joi.string(),
    isActivated: Joi.boolean(),
    location: Joi.string().required().label("Cơ Sở PCCC"),
    fullname: Joi.string().required().label("Họ Và Tên"),
    phone: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .required()
      .label("Số Điện Thoại"),
    gender: Joi.string().required().label("Giới Tính"),
    avatar: Joi.any(),
  };

  doSubmit = async () => {
    //call the server
    try {
      const { account } = this.state;
      //create new super case
      if (!account.supervisor) {
        const { headers } = await createSupervisor(this.state.data);
        auth.loginWithJwt(headers["x-auth-token"]);
        toast(
          "Tài khoản của bạn đã được tạo thành công, hãy chờ quản trị viên chấp thuận.",
          {
            type: toast.TYPE.SUCCESS,
            onClose: () => {
              return (window.location = "/homepage");
            },
          }
        );
        //edit super case
      } else {
        const { headers } = await editSupervisor(
          this.state.data,
          this.state.avatarInput
        );
        auth.loginWithJwt(headers["x-auth-token"]);
        toast("Cập nhật thông tin cá nhân thành công", {
          type: toast.TYPE.SUCCESS,
          onClose: () => {
            return (window.location = "/homepage");
          },
        });
      }
    } catch (ex) {
      if (ex.response) {
        const { status } = ex.response;
        if (status === 401 || status === 400 || status === 404) {
          const errors = { ...this.state.errors };
          errors.fullname = ex.response.data;
          this.setState({ errors });
        }
      }
    }
  };

  render() {
    //in case of user already logged in => redirect them to homepage
    document.title = "Thông Tin Cá Nhân";
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
            Thông Tin Cá Nhân
          </h3>
          <img
            src={
              this.state.data.avatar
                ? getResizedImage(this.state.data.avatar, 200, true)
                : "https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/profile-avatar/male-avatar.png"
            }
            className="image-preview rounded-circle img-thumbnail mx-auto d-block"
            alt="avatar"
          ></img>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("fullname", "Họ Và Tên", "text")}
            {this.renderInput("phone", "Số Điện Thoại", "text")}
            {this.renderSelect(
              "gender",
              "Giới Tính",
              this.state.genders,
              "name"
            )}
            {this.renderSelect(
              "location",
              "Địa Chỉ Làm Việc",
              this.state.fireStations,
              "address"
            )}
            {!this.state.account.supervisor ? (
              <div />
            ) : (
              <div className="mb-4">
                <label>Ảnh Đại Diện</label>
                <div className="custom-file ">
                  <label htmlFor="avatarInput" className="custom-file-label">
                    {this.state.avatarInput
                      ? this.state.avatarInput.name
                      : "Chọn ảnh..."}
                  </label>
                  <input
                    id="avatarInput"
                    className="custom-file-input"
                    type="file"
                    name="avatar"
                    accept="image/jpeg,image/png"
                    onChange={(e) => this.fileSelectedHandler(e)}
                  />
                </div>
              </div>
            )}

            {this.renderButton("Lưu Thông Tin Cá Nhân")}
          </form>
          <div className="text-center mt-3">
            <button
              className="btn btn-link"
              onClick={async () => {
                try {
                  await requestResetPassword(this.state.account.email);
                  toast.info("Kiểm Tra Email Để Tiến Hành Đổi Mật Khẩu");
                } catch (ex) {}
              }}
            >
              Thay Đổi Mật Khẩu
            </button>
          </div>
        </div>
      </LoadingScreen>
    );
  }
}

export default ProfileForm;
