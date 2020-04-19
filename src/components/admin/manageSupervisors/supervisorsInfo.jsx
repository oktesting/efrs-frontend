import React, { Component } from "react";
import {
  getSupervisor,
  changeSupervisorActivation,
} from "../../../services/supervisorService";
import ListGroup from "../../common/listGroup";
import SupervisorsInfoTab from "./supervisorsInfoTab";
import FiresHistoryTab from "../../manageUsers/firesHistoryTab";
import LocationsTab from "../../manageUsers/locationsTab";
import { toast } from "react-toastify";

class SupervisorInfo extends Component {
  constructor() {
    super();
    const tabs = [{ _id: 1, name: "Thông Tin Cán Bộ" }];
    this.state.tabs = tabs;
    this.state.selectedTab = tabs[0];
  }

  state = {
    supervisor: {
      supervisorId: "",
      name: "",
      email: "",
      isActivated: "",
      gender: "",
      fullname: "",
      phone: "",
      avatar: "",
    },
    firesHistory: [],
    locations: [],
  };

  async populatingSupervisor() {
    try {
      const accountId = this.props.match.params.id;
      const { data: acc } = await getSupervisor(accountId);
      this.setState({ supervisor: this.mapToViewModel(acc) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(acc) {
    return {
      supervisorId: acc.supervisor._id,
      name: acc.name,
      email: acc.email,
      isActivated: acc.supervisor.isActivated,
      fullname: acc.supervisor.fullname,
      phone: acc.supervisor.phone,
      gender: acc.supervisor.gender,
      avatar: acc.supervisor.avatar,
    };
  }

  async componentDidMount() {
    await this.populatingSupervisor();
  }

  handleTabSelect = (tab) => {
    this.setState({ selectedTab: tab });
  };

  handleChangeActivation = async () => {
    let newSupervisor = { ...this.state.supervisor };
    const { supervisorId, isActivated } = this.state.supervisor;
    try {
      newSupervisor.isActivated = !isActivated;
      await changeSupervisorActivation(supervisorId);
      toast.success(
        isActivated ? "Chặn Cán Bộ Thành Công" : "Chấp Thuận Cán Bộ Thành Công"
      );
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
    this.setState({ supervisor: newSupervisor });
  };

  render() {
    const { selectedTab, supervisor, firesHistory, locations } = this.state;
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
            <SupervisorsInfoTab
              supervisor={supervisor}
              handleChangeActivation={this.handleChangeActivation}
            />
          ) : selectedTab._id === 2 ? (
            <FiresHistoryTab firesHistory={firesHistory} />
          ) : (
            <LocationsTab locations={locations} />
          )}
        </div>
      </div>
    );
  }
}

export default SupervisorInfo;
