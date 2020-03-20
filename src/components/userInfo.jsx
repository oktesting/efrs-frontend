import React, { Component } from "react";
import { getUser } from "../services/userService";
import ListGroup from "./common/listGroup";

class UserInfo extends Component {
  constructor() {
    super();
    const tabs = [
      { _id: 1, name: "User Information" },
      { _id: 2, name: "Fires History" },
      { _id: 3, name: "Locations" }
    ];
    this.state.tabs = tabs;
    this.state.selectedTab = tabs[0];
  }

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

  async componentDidMount() {
    await this.populatingUser();
  }

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

  renderUserInfoTab() {
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
      <div className="col shadow">
        <div className="row mt-3">
          <div className="col">
            <div className="row">
              <div className="col-9">
                <h4>User Information</h4>
              </div>
              <div className="col-3">
                <button name="submit" type="submit" className="btn btn-danger">
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
    );
  }

  renderFiresHistoryTab() {
    return <div>Fire History</div>;
  }
  renderLocationsTab() {
    return <div>Location</div>;
  }

  handleTabSelect = tab => {
    this.setState({ selectedTab: tab });
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <div className="userInfo">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.tabs}
              selectedItem={this.state.selectedTab}
              onItemSelect={this.handleTabSelect}
            />
          </div>
          {selectedTab._id === 1
            ? this.renderUserInfoTab()
            : selectedTab._id === 2
            ? this.renderFiresHistoryTab()
            : this.renderLocationsTab()}
        </div>
      </div>
    );
  }
}

export default UserInfo;
