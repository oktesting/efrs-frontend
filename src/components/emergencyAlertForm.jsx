import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { getSupervisor } from "../services/supervisorService";
import { issueEmergencyAlert } from "../services/emergencyAlertService";

class EmergencyAlertForm extends Form {
  state = {
    data: {
      lat: "",
      lng: "",
      radius: "",
      title: "",
      message: ""
    },
    errors: {},
    account: {}
  };
  schema = {
    _id: Joi.string(),
    lat: Joi.number()
      .min(-90)
      .max(90)
      .label("latitude"),
    lng: Joi.number()
      .min(-180)
      .max(180)
      .label("Longtitude"),
    radius: Joi.number()
      .required()
      .label("Radius"),
    title: Joi.string().required(),
    message: Joi.string().required()
  };

  async componentDidMount() {
    this.setState({ account: auth.getCurrentUser() });
  }

  doSubmit = async () => {
    //call the server
    try {
      const alert = { ...this.state.data };
      // @todo đoạn này sẽ tạch nếu acc vừa đc tạo từ signup và chưa tạo supervisor
      alert.supervisor = this.state.account.supervisor._id;
      await issueEmergencyAlert(alert);
      toast.success("Emergency Alert submitted");
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
    return (
      <React.Fragment>
        <div className="form-signin">
          <h3 className="font-weight-normal text-center mb-4">
            Emergency Alert
          </h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("lat", "Lattitude", "text")}
            {this.renderInput("lng", "Longitute", "text")}
            {this.renderInput("radius", "Radius", "text")}
            {this.renderInput("title", "Title", "text")}
            {this.renderTextArea("message", "Message")}
            {this.renderButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EmergencyAlertForm;
