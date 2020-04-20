import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { region } from "../../../config.json";
import { addNewFireStation } from "../../../services/locationService";
import { toast } from "react-toastify";
// import auth from "../../services/authService";

class FireStationForm extends Form {
  state = {
    data: {
      address: "",
      lat: "",
      lng: "",
      province: "",
      district: "",
    },
    provinces: region.provinces,
    districtHN: region.districtHN,
    districtHCM: region.districtHCM,
    errors: {},
  };

  schema = {
    lat: Joi.number().min(-90).max(90).label("Vĩ Độ"),
    lng: Joi.number().min(-180).max(180).label("Kinh Độ"),
    address: Joi.string().required().label("Địa Chỉ"),
    province: Joi.string().required().label("Tỉnh"),
    district: Joi.string().required().label("Quận/Huyện"),
  };

  doSubmit = async () => {
    //call the server
    try {
      await addNewFireStation(this.state.data);
      toast("Tạo Cơ sở PCCC thành công.", {
        type: toast.TYPE.SUCCESS,
        onClose: () => {
          return this.props.history.push("/fire-station");
        },
      });
    } catch (ex) {
      if (ex.response) {
      }
    }
  };

  render() {
    document.title = "Quản Lý Cơ Sở PCCC";
    return (
      <React.Fragment>
        <div className="form-signin">
          <h3 className="font-weight-normal text-center mb-4">
            Cơ Sở Phòng Cháy
            <br />
            Chữa Cháy
          </h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("address", "Địa Điểm", "text")}
            {this.renderInput("lat", "Vĩ Độ", "text")}
            {this.renderInput("lng", "Kinh Độ", "text")}
            {this.renderSelect("province", "Tỉnh", this.state.provinces, "_id")}
            {this.state.data.province === "Hà Nội" ? (
              this.renderSelect(
                "district",
                "Quận/Huyện",
                this.state.districtHN,
                "_id"
              )
            ) : (
              <div></div>
            )}
            {this.state.data.province === "TP Hồ Chí Minh" ? (
              this.renderSelect(
                "district",
                "Quận/Huyện",
                this.state.districtHCM,
                "_id"
              )
            ) : (
              <div></div>
            )}
            {this.renderButton("Tạo Mới")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default FireStationForm;
