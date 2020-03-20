import React, { Component } from "react";
import { getUser } from "../services/userService";

class UserInfo extends Component {
  state = {
    data: {
      isVerified: "",
      name: "",
      email: "",
      isActivated: "",
      gender: "",
      fullname: "",
      phone: "",
      age: "",
      avatar: ""
    }
  };
  async populatingUser() {
    try {
      const accountId = this.props.match.params.id;
      const { data: acc } = await getUser(accountId);
      this.setState({ data: this.mapToViewModel(acc) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populatingUser();
  }

  renderUserInfo(label, data) {
    return (
      <div className="form-group row">
        <label className="col-4 col-form-label">{label}</label>
        <div className="col-8">
          <input
            placeholder="Email"
            value={data}
            className="form-control here"
            type="text"
            disabled
          />
        </div>
      </div>
    );
  }

  mapToViewModel(acc) {
    return {
      isVerified: acc.isVerified,
      name: acc.name,
      email: acc.email,
      isActivated: acc.user.isActivated,
      fullname: acc.user.fullname,
      phone: acc.user.phone,
      gender: acc.user.gender,
      age: acc.user.age,
      avatar: acc.user.avatar
    };
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
    } = this.state.data;

    return (
      <div className="userInfo">
        <div className="row">
          <div className="col-3">
            <a href="#" class="list-group-item list-group-item-action active">
              User Information
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              Fire report history
            </a>
          </div>

          <div className="col shadow">
            <div className="row mt-3">
              <div className="col">
                <div className="row">
                  <div className="col-9">
                    <h4>User Information</h4>
                  </div>
                  <div class="col-3">
                    <button
                      name="submit"
                      type="submit"
                      className="btn btn-danger"
                    >
                      Deactivate user
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
        </div>
      </div>
    );
  }
}

export default UserInfo;
