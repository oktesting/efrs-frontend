import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import { getAllFireStation } from "../services/locationService";
import {
  createSupervisor,
  getSupervisor,
  editSupervisor
} from "../services/supervisorService";
import { toast } from "react-toastify";
import ImageCrop from "../components/avatar";

class ProfileForm extends Form {
  state = {
    data: {
      fullname: "",
      phone: "",
      gender: "",
      location: "",
      avatar: ""
    },
    genders: [
      {
        _id: "male",
        name: "Male"
      },
      {
        _id: "female",
        name: "Female"
      }
    ],
    fireStations: [],
    errors: {},
    user: {}
  };

  async populateFireStation() {
    // gọi tới server để kéo về mảng fire stations
    const { data: fireStations } = await getAllFireStation();
    this.setState({ fireStations });
  }
  async populatingSupervisor() {
    try {
      const { user } = this.state;
      //create new super case
      if (!user.supervisor) return;
      //edit super case
      const { data: supervisor } = await getSupervisor();
      this.setState({ data: this.mapToViewModel(supervisor) });
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
      avatar: supervisor.avatar
    };
  }
  async componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
    await this.populateFireStation();
    await this.populatingSupervisor();
  }
  schema = {
    _id: Joi.string(),
    isActivated: Joi.boolean(),
    location: Joi.string()
      .required()
      .label("Fire Station"),
    fullname: Joi.string()
      .required()
      .label("Full Name"),
    phone: Joi.string()
      .min(10)
      .max(11)
      .required()
      .label("Phone"),
    gender: Joi.string()
      .required()
      .label("Gender"),
    avatar: Joi.any()
  };

  doSubmit = async () => {
    //call the server
    try {
      const { user } = this.state;
      //create new super case
      if (!user.supervisor) {
        await createSupervisor(this.state.data);
        toast("Your profile is created. Please sign in again.", {
          type: toast.TYPE.SUCCESS,
          onClose: () => {
            return this.props.history.replace("/signout");
          },
          onClick: () => {
            return this.props.history.replace("/signout");
          }
        });
      }
      //edit super case
      await editSupervisor(this.state.data);
      toast("Your profile is modified.", {
        type: toast.TYPE.SUCCESS,
        onClose: () => {
          return this.props.history.replace("/");
        },
        onClick: () => {
          return this.props.history.replace("/");
        }
      });
    } catch (ex) {
      const { status } = ex.response;
      if (ex.response && (status === 401 || status === 400 || status === 404)) {
        const errors = { ...this.state.errors };
        errors.fullname = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    //in case of user already logged in => redirect them to homepage

    return (
      <React.Fragment>
        <div className="form-signin">
          <h3 className="font-weight-normal text-center mb-4">Profile</h3>
          {this.state.data.avatar ? (
            <img
              src={this.state.data.avatar}
              className="image-preview rounded-circle"
            ></img>
          ) : (
            <img
              src="https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/profile-avatar/male-avatar.png"
              className="image-preview rounded-circle"
            ></img>
          )}
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("fullname", "Full Name", "text")}
            {this.renderInput("phone", "Phone", "text")}
            {this.renderSelect("gender", "Gender", this.state.genders, "name")}
            {this.renderSelect(
              "location",
              "Fire Station",
              this.state.fireStations,
              "address"
            )}
            {this.renderButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileForm;
