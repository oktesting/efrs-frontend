import React, { Component } from "react";
import { getUser } from "../../services/userService";
import { getFiresByUserId } from "../../services/fireService";
import ListGroup from "../common/listGroup";
import UserInfoTab from "./userInfoTab";
import FiresHistoryTab from "./firesHistoryTab";
import LocationsTab from "./locationsTab";

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
    user: {
      isVerified: "",
      name: "",
      email: "",
      isActivated: "",
      gender: "",
      fullname: "",
      phone: "",
      age: "",
      avatar: ""
    },
    firesHistory: []
  };

  async populatingUser() {
    try {
      const accountId = this.props.match.params.id;
      const { data: acc } = await getUser(accountId);
      this.setState({ user: this.mapToViewModel(acc) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async populatingFiresHistory() {
    try {
      this.setState({ firesHistory: getFiresByUserId(1) });
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
    await this.populatingFiresHistory();
  }

  handleTabSelect = tab => {
    this.setState({ selectedTab: tab });
  };

  render() {
    const { selectedTab, user, firesHistory } = this.state;
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
          {selectedTab._id === 1 ? (
            <UserInfoTab user={user} />
          ) : selectedTab._id === 2 ? (
            <FiresHistoryTab firesHistory={firesHistory} />
          ) : (
            <LocationsTab />
          )}
        </div>
      </div>
    );
  }
}

export default UserInfo;
