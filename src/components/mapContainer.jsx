import React, { Component } from "react";
import WrappedMap from "./wrappedMap";
import { toast } from "react-toastify";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //duccm4
      fires: []
    };

    //duccm4
    this.eventSource = new EventSource("http://localhost:3900/api/fires");
  }

  state = {};

  componentDidMount() {
    //duccm4
    this.eventSource.addEventListener("realtimeEvent", e => {
      this.getDataFromRealtimeEvent(JSON.parse(e.data));
    });
    this.eventSource.addEventListener("firstEvent", e => {
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
    const id = updatedFires.findIndex(fire => fire._id === newFire._id);
    if (id === -1) updatedFires.push(newFire);
    else updatedFires[id] = newFire;
    this.setState({ fires: updatedFires });
    toast(
      <div>
        <i class="fa fa-exclamation-triangle" /> Received new fire.
      </div>,
      {
        type: toast.TYPE.WARNING,
        hideProgressBar: true,
        newestOnTop: true,
        autoClose: false
      }
    );
  }

  stopUpdates() {
    this.eventSource.close();
  }

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
        ></WrappedMap>
      </div>
    );
  }
}

export default MapContainer;
