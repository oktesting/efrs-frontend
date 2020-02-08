import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //duccm4
      fires: []
    };
    //duccm4
    this.eventSource = new EventSource("http://localhost:3900/api/alert");
  }

  componentDidMount() {
    //duccm4
    this.eventSource.addEventListener("realtimeEvent", e => {
      this.getDataFromRealtimeEvent(JSON.parse(e.data));
    });
    this.eventSource.addEventListener("firstEvent", e => {
      this.getDataFromTheFistEvent(JSON.parse(e.data));
    });
  }

  //duccm4
  getDataFromTheFistEvent(firesList) {
    this.setState({ fires: firesList });
  }
  getDataFromRealtimeEvent(newFire) {
    let updatedFires = [...this.state.fires];
    updatedFires.push(newFire);
    this.setState({ fires: updatedFires });
  }

  stopUpdates() {
    this.eventSource.close();
  }

  renderFires() {
    this.state.fires.map(item => (
      <Marker
        key={item._id}
        position={{
          lat: item.latitude,
          lng: item.longtitude
        }}
        onClick={() => {
          console.log("clicked");
        }}
      ></Marker>
    ));
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{
          lat: 21.013412,
          lng: 105.527138
        }}
      >
        {this.state.fires.map(item => (
          <Marker
            key={item._id}
            position={{
              lat: item.latitude,
              lng: item.longtitude
            }}
            onClick={() => {
              console.log("clicked");
            }}
          ></Marker>
        ))}

        {/* <Marker
          position={{
            lat: 21.009886,
            lng: 105.535104
          }}
          onClick={() => {
            console.log("clicked");
          }}
        >
          <InfoWindow>
            <div>point detail</div>
          </InfoWindow>
        </Marker> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDaVnsRo6JaVv_a8XMwB1gAYeMIESGD9p4"
})(MapContainer);
