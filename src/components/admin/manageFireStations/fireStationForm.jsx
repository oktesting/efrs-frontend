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
      district: ""
    },
    provinces: region.provinces,
    districtHN: region.districtHN,
    districtHCM: region.districtHCM,
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

  doSubmit = async () => {
    //call the server
    try {
      await addNewFireStation(this.state.data);
      toast("New Fire Station Added.", {
        type: toast.TYPE.SUCCESS,
        onClose: () => {
          return this.props.history.push("/fire-station");
        }
      });
    } catch (ex) {
      if (ex.response) {
      }
    }
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
              "_id"
            )}
            {this.state.data.province === "Hà Nội" ? (
              this.renderSelect(
                "district",
                "District",
                this.state.districtHN,
                "_id"
              )
            ) : (
              <div></div>
            )}
            {this.state.data.province === "TP Hồ Chí Minh" ? (
              this.renderSelect(
                "district",
                "District",
                this.state.districtHCM,
                "_id"
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
