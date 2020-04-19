import React, { Component } from "react";
import WrappedMap from "./wrappedMap";
import { toast } from "react-toastify";
import auth from "../../services/authService";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    const acc = auth.getCurrentUser();
    this.state = {
      //duccm4
      fires: [],
      stationCenter: {
        lat: acc.supervisor.location.lat,
        lng: acc.supervisor.location.lng,
      },
    };

    //duccm4
    this.eventSource = new EventSource("http://localhost:3900/api/fires");
  }

  state = {};

  componentDidMount() {
    //duccm4
    this.eventSource.addEventListener("realtimeEvent", (e) => {
      this.getDataFromRealtimeEvent(JSON.parse(e.data));
    });
    this.eventSource.addEventListener("firstEvent", (e) => {
      this.getDataFromTheFistEvent(JSON.parse(e.data));
    });
  }
  componentWillUnmount() {
    this.stopUpdates();
  }
  //duccm4
  getDataFromTheFistEvent(firesList) {
    this.setState({ fires: firesList });
  }
  getDataFromRealtimeEvent(newFire) {
    let updatedFires = [...this.state.fires];
    const id = updatedFires.findIndex((fire) => fire._id === newFire._id);
    if (id === -1) updatedFires.push(newFire);
    else updatedFires[id] = newFire;
    this.setState({ fires: updatedFires });
    toast(
      <div className="text-dark">
        <i className="fa fa-exclamation-triangle" /> Tiếp nhận 1 thông báo cháy
        mới
      </div>,
      {
        type: toast.TYPE.WARNING,
        hideProgressBar: true,
        newestOnTop: true,
        autoClose: false,
      }
    );
  }

  stopUpdates() {
    this.eventSource.close();
  }

  handleDeleteFire = async (fireId) => {
    const originalFires = this.state.fires;
    let fires;
    try {
      fires = originalFires.filter((fire) => fireId !== fire._id);
      console.log(fireId);
      // gọi tới server
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error("fire is already deleted");
        // fires = originalFires;
      }
    }
    this.setState({ fires });
  };

  handleChangeStatusFire = async (fireId) => {
    // const originalFires = this.state.fires;
    // let fires = [...originalFires];
    try {
      console.log(fireId);
      // gọi tới server
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error("fire is already deleted");
        // fires = originalFires;
      }
    }
    // this.setState({ fires });
  };

  render() {
    return (
      <div>
        <WrappedMap
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDaVnsRo6JaVv_a8XMwB1gAYeMIESGD9p4"
          }
          loadingElement={<div style={{ height: `100vw` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          fires={this.state.fires}
          handleDeleteFire={this.handleDeleteFire}
          handleChangeStatusFire={this.handleChangeStatusFire}
          stationCenter={this.state.stationCenter}
        ></WrappedMap>
      </div>
    );
  }
}

export default MapContainer;
