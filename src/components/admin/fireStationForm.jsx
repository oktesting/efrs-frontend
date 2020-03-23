import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../../services/authService";

class FireStationForm extends Form {
  state = {
    data: {
      address: "",
      lat: "",
      lng: "",
      province: "",
      district: ""
    },
    provinces: [
      {
        name: "Hà Nội"
      },
      {
        name: "TP Hồ Chí Minh"
      }
    ],
    districtHN: [
      {
        name: "Hoàn Kiếm"
      },
      {
        name: "Đống Đa"
      }
    ],
    districtHCM: [
      {
        name: "Quận 1"
      },
      {
        name: "Quận 2"
      },
      {
        name: "Quận 2"
      },
      {
        name: "Quận 3"
      },
      {
        name: "Quận 4"
      },
      {
        name: "Quận 5"
      },
      {
        name: "Quận 6"
      },
      {
        name: "Quận 7"
      },
      {
        name: "Quận 8"
      },
      {
        name: "Quận 9"
      },
      {
        name: "Quận 10"
      }
    ],
    errors: {}
  };

  schema = {
    lat: Joi.number()
      .min(-90)
      .max(90)
      .label("Latitude"),
    lng: Joi.number()
      .min(-180)
      .max(180)
      .label("Longtitude"),
    address: Joi.string()
      .required()
      .label("Address"),
    province: Joi.string()
      .required()
      .label("Province"),
    district: Joi.string()
      .required()
      .label("District")
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-signin">
          <h3 className="font-weight-normal text-center mb-4">
            New Fire Station
          </h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("address", "Address", "text")}
            {this.renderInput("lat", "Lattitude", "text")}
            {this.renderInput("lng", "Longitute", "text")}
            {this.renderSelect(
              "province",
              "Province",
              this.state.provinces,
              "name"
            )}
            {this.state.data.province === "Hà Nội" ? (
              this.renderSelect(
                "district",
                "District",
                this.state.districtHN,
                "name"
              )
            ) : (
              <div></div>
            )}
            {this.state.data.province === "TP Hồ Chí Minh" ? (
              this.renderSelect(
                "district",
                "District",
                this.state.districtHCM,
                "name"
              )
            ) : (
              <div></div>
            )}
            {this.renderButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default FireStationForm;
