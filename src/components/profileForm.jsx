import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import locations from "../services/locationService";

class ProfileForm extends Form {
  state = {
    data: {
      fullname: "",
      phone: "",
      gender: "",
      location: ""
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
    errors: {}
  };

  async populateFireStation() {
    // gọi tới server để kéo về mảng fire stations
    const { data: fireStations } = await locations.getAllFireStation();
    this.setState({ fireStations });
  }
  // async populatingSupervisor() {
  //   try {
  //     const supervisorId = this.props.match.params.id;
  //     if (supervisorId === "new") return;

  //     // const { data: supervisor } = await getSupervisor(supervisorId);
  //     this.setState({ data: this.mapToViewModel(supervisor) });
  //   } catch (error) {
  //     if (error.response && error.response.status === 404)
  //       return this.props.history.replace("/not-found");
  //   }
  // }
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
    await this.populateFireStation();
    // await this.populatingSupervisor();
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
    avatar: Joi.string()
  };

  doSubmit = async () => {
    //call the server
    try {
      // const { username: email, password } = this.state.data;
      // await auth.login(email, password);
      // //get the previous page before redirected to /login
      // const { state } = this.props.location;
      // //cause the full reload page => read the jwt => display info of user properly
      // window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      // if (ex.response && ex.response.status === 400) {
      //   const errors = { ...this.state.errors };
      //   errors.username = ex.response.data;
      //   this.setState({ errors });
      // }
    }
  };

  render() {
    //in case of user already logged in => redirect them to homepage
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <div className="form-signin">
          <h3 className="font-weight-normal text-center mb-4">Profile</h3>
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
