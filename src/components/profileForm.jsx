import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class ProfileForm extends Form {
  state = {
    data: {
      fullname: "",
      phone: "",
      genderId: "",
      fireStationId: ""
    },
    genders: [
      {
        _id: 1,
        name: "Male"
      },
      {
        _id: 2,
        name: "Female"
      }
    ],
    fireStations: [
      {
        _id: 1,
        address: "Đội Phòng cháy chữa cháy và Cứu nạn cứu hộ quận Hoàn Kiếm",
        lat: 21.028254,
        lng: 105.868407
      },
      {
        _id: 2,
        address: "Phòng Cảnh Sát Phòng Cháy Và Chữa Cháy Số 3",
        lat: 21.044959,
        lng: 105.792497
      },
      {
        _id: 3,
        address: "Đội Cảnh sát PCCC&CNCH Quận Hoàn Kiếm",
        lat: 21.025866,
        lng: 105.860093
      },
      {
        _id: 4,
        address: "Cục Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ",
        lat: 21.026296,
        lng: 105.854101
      },
      {
        _id: 5,
        address: "Cảnh Sát Phòng Cháy",
        lat: 21.022533,
        lng: 105.85705
      }
    ],
    errors: {}
  };
  componentDidMount() {
    // gọi tới server để kéo về mảng fire stations
  }
  schema = {
    isActivated: Joi.boolean(),
    location: Joi.string(),
    fullname: Joi.string()
      .required()
      .label("Full Name"),
    phone: Joi.string()
      .required()
      .min(10)
      .max(11)
      .label("Phone"),
    genderId: Joi.string()
      .required()
      .label("Gender"),
    fireStationId: Joi.string()
      .required()
      .label("Fire Station"),
    isFireStation: Joi.boolean(),
    province: Joi.string()
      .required()
      .label("Province"),
    district: Joi.string()
      .required()
      .label("District")
  };

  doSubmit = async () => {
    //call the server
    try {
      const { username: email, password } = this.state.data;
      await auth.login(email, password);
      //get the previous page before redirected to /login
      const { state } = this.props.location;
      //cause the full reload page => read the jwt => display info of user properly
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    //in case of user already logged in => redirect them to homepage
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <h1 className="container">Profile</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("fullname", "Full Name", "text")}
          {this.renderInput("phone", "Phone", "text")}
          {this.renderSelect("genderId", "Gender", this.state.genders, "name")}
          {this.renderSelect(
            "fireStationId",
            "Fire Station",
            this.state.fireStations,
            "address"
          )}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default ProfileForm;
