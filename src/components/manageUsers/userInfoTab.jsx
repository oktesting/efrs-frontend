import React, { Component } from "react";

class UserInfoTab extends Component {
  renderUserInfo(label, data) {
    return (
      <div className="form-group row">
        <label className="col-4 col-form-label">{label}</label>
        <div className="col-8">
          <input
            placeholder={label}
            value={data}
            className="form-control here"
            type="text"
            disabled
          />
        </div>
      </div>
    );
  }

  render() {
    const {
      avatar,
      age,
      gender,
      phone,
      fullname,
      isActivated,
      email,
      name,
      isVerified
    } = this.props.user;

    return (
      <div className="col shadow">
        <div className="row mt-3">
          <div className="col">
            <div className="row">
              <div className="col-9">
                <h4>User Information</h4>
              </div>
              <div className="col-3">
                <button
                  name="submit"
                  type="submit"
                  className={isActivated ? "btn btn-danger" : "btn btn-success"}
                  onClick={this.props.handleChangeActivation}
                >
                  {isActivated ? "Deactivate User" : "Activate User"}
                </button>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form>
              <div className="form-group row">
                <img
                  src={avatar}
                  className="image-preview rounded-circle img-thumbnail mx-auto d-block"
                  alt="avatar"
                />
              </div>
              {this.renderUserInfo("Email", email)}
              {this.renderUserInfo("Username", name)}
              {this.renderUserInfo("Full Name", fullname)}
              {this.renderUserInfo("Phone", phone)}
              {this.renderUserInfo("Gender", gender)}
              {this.renderUserInfo("Age", age)}
              {this.renderUserInfo("Is Verified", isVerified)}
              {this.renderUserInfo("Is Activated", isActivated)}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfoTab;
