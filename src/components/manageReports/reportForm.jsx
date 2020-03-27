import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { submitNewReport } from "../../services/reportService";
import { toast } from "react-toastify";

class ReportForm extends Form {
  state = {
    data: {
      location: "",
      area: "",
      totalVehicle: "",
      totalFireman: "",
      totalDamageProperty: "",
      totalDeath: "",
      totalInjury: "",
      summary: ""
    },
    errors: {}
  };
  schema = {
    location: Joi.string().label("Location"),
    area: Joi.number()
      .min(0)
      .label("Area"),
    totalVehicle: Joi.number()
      .min(0)
      .integer()
      .label("totalVehicle"),
    totalFireman: Joi.number()
      .min(0)
      .integer()
      .label("totalFireman"),
    totalDamageProperty: Joi.number()
      .min(0)
      .label("totalDamageProperty"),
    totalDeath: Joi.number()
      .min(0)
      .integer()
      .label("totalDeath"),
    totalInjury: Joi.number()
      .min(0)
      .integer()
      .label("totalInjury"),
    summary: Joi.string().label("Summary"),
    _id: Joi.string(),
    createdAt: Joi.string(),
    fire: Joi.string(),
    duration: Joi.string(),
    receivedTime: Joi.string(),
    finishedTime: Joi.string()
  };

  async componentDidMount() {
    // this.setState({ account: auth.getCurrentUser() });
  }

  doSubmit = async () => {
    //call the server
    try {
      const report = {
        ...this.state.data,
        receivedTime: this.props.match.params.receivedTime,
        fire: this.props.match.params.fireId,
        finishedTime: new Date().toISOString()
      };
      await submitNewReport(report);
      toast("Fire Report is Submitted", {
        type: toast.TYPE.SUCCESS,
        onClose: () => {
          return this.props.history.push("/reports");
        }
      });
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 400)
          toast(ex.response.data, {
            type: toast.TYPE.WARNING,
            onClose: () => {
              return window.close();
            }
          });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="userInfo shadow mt-3 pb-3 pl-2 pr-2">
          <h3 className="font-weight-normal text-center mb-2 pt-2">
            Fire Report
          </h3>
          <hr />
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("location", "Location", "text")}
            <div className="row">
              <div className="col-4">
                {this.renderInput("area", "Area (m2)", "text")}
              </div>
              <div className="col-4">
                {this.renderInput("totalVehicle", "Total Vehicle", "text")}
              </div>
              <div className="col-4">
                {this.renderInput("totalFireman", "Total Fireman", "text")}
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                {this.renderInput(
                  "totalDamageProperty",
                  "Damaged Property (billion dong)",
                  "text"
                )}
              </div>
              <div className="col-4">
                {this.renderInput("totalDeath", "Death", "text")}
              </div>
              <div className="col-4">
                {this.renderInput("totalInjury", "Injury", "text")}
              </div>
            </div>

            {this.renderTextArea("summary", "Summary", 10)}
            {this.renderButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ReportForm;
