import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { getAllFireStation } from "../services/locationService";
import {
  createSupervisor,
  getSupervisor,
  editSupervisor
} from "../services/supervisorService";
import { toast } from "react-toastify";

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
    account: {}
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
      avatar: supervisor.avatar
    };
  }
  async componentDidMount() {
    this.setState({ account: auth.getCurrentUser() });
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
      .trim()
      .regex(/^[0-9]{10}$/)
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
      const { account } = this.state;
      //create new super case
      if (!account.supervisor) {
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

    return (
      <React.Fragment>
        <div className="form-signin">
          <h3 className="font-weight-normal text-center mb-4">Profile</h3>
          <img
            src={
              this.state.data.avatar
                ? this.state.data.avatar
                : "https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/profile-avatar/male-avatar.png"
            }
            className="image-preview rounded-circle img-thumbnail mx-auto d-block"
            alt="avatar"
          ></img>
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
