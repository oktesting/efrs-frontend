import React, { Component } from "react";
import { getUser, changeUserActivation } from "../../services/userService";
import { getFiresByUserId } from "../../services/fireService";
import { getAllLocationOfUser } from "../../services/locationService";
import ListGroup from "../common/listGroup";
import UserInfoTab from "./userInfoTab";
import FiresHistoryTab from "./firesHistoryTab";
import LocationsTab from "./locationsTab";
import { toast } from "react-toastify";
import loadingLogo from "../../media/profile.svg";
import LoadingScreen from "react-loading-screen";

class UserInfo extends Component {
  constructor() {
    super();
    const tabs = [
      { _id: 1, name: "Thông Tin Cá Nhân" },
      { _id: 2, name: "Lịch Sử Báo Cháy" },
      { _id: 3, name: "Địa Điểm" },
    ];
    this.state.tabs = tabs;
    this.state.selectedTab = tabs[0];
    this.state.loading = true;
  }

  state = {
    user: {
      userId: "",
      isVerified: "",
      name: "",
      email: "",
      isActivated: "",
      gender: "",
      fullname: "",
      phone: "",

      dob: "",
      avatar: "",
    },
    firesHistory: [],
    locations: [],
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
  async populatingLocations() {
    try {
      const { data: locations } = await getAllLocationOfUser(
        this.state.user.userId
      );
      this.setState({ locations });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async populatingFiresHistory() {
    try {
      const { data: firesHistory } = await getFiresByUserId(
        this.state.user.userId
      );
      this.setState({ firesHistory });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(acc) {
    return {
      userId: acc.user._id,
      isVerified: acc.isVerified,
      name: acc.name,
      email: acc.email,
      isActivated: acc.user.isActivated,
      fullname: acc.user.fullname,
      phone: acc.user.phone,
      gender: acc.user.gender,
      dob: acc.user.dob,
      avatar: acc.user.avatar,
    };
  }

  async componentDidMount() {
    await this.populatingUser();
    await this.populatingFiresHistory();
    await this.populatingLocations();
    this.setState({ loading: false });
  }

  handleTabSelect = (tab) => {
    this.setState({ selectedTab: tab });
  };

  handleChangeActivation = async () => {
    let newUser = { ...this.state.user };
    const { userId, isActivated } = this.state.user;
    try {
      newUser.isActivated = !isActivated;
      await changeUserActivation(userId);
      toast.success(
        isActivated
          ? "Chặn người dùng thành công"
          : "Bỏ chặc người dùng thành công"
      );
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
    this.setState({ user: newUser });
  };

  render() {
    const { selectedTab, user, firesHistory, locations, loading } = this.state;
    document.title = "Quản Lý Người Dùng";
    return (
      <LoadingScreen
        loading={loading}
        bgColor="#f1f1f1"
        spinnerColor="#51c2e0"
        textColor="#676767"
        logoSrc={loadingLogo}
        text="Đang Tải Người Dùng Trong Hệ Thống"
      >
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
              <UserInfoTab
                user={user}
                handleChangeActivation={this.handleChangeActivation}
              />
            ) : selectedTab._id === 2 ? (
              <FiresHistoryTab firesHistory={firesHistory} />
            ) : (
              <LocationsTab locations={locations} />
            )}
          </div>
        </div>
      </LoadingScreen>
    );
  }
}

export default UserInfo;
