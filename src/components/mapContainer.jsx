import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

const mapStyles = {
  width: "100vw",
  height: "100vh"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //duccm4
      fires: [],
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
    };

    //duccm4
    this.eventSource = new EventSource("http://localhost:3900/api/alert");
  }

  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

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
    console.log(firesList);
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

//   getPhotosFromAFire() {
//     this.state.selectedPlace.evidences.map(item =>)
//   }

  renderFires() {
    console.log(this.state.fires);
    this.state.fires.map(item => (
      <Marker
        key={item._id}
        position={{
          lat: item.latitude,
          lng: item.longtitude
        }}
      ></Marker>
    ));
  }

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        zoom={15}
        style={mapStyles}
        initialCenter={{
          lat: 21.013412,
          lng: 105.527138
        }}
      >
        {this.state.fires.map(item => (
          <Marker
            name={"FPT University"}
            key={item._id}
            onClick={this.onMarkerClick}
            position={{
              lat: item.latitude,
              lng: item.longtitude
            }}
            // photos={}
          ></Marker>
        ))}
        {/* <Marker
          name={"FPT University"}
          onClick={this.onMarkerClick}
          position={{
            lat: 21.013412,
            lng: 105.527138
          }}
        ></Marker> */}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div id="infoWindow">
            <h1>{this.state.selectedPlace.name}</h1>
            <div>
              <h3>Photos</h3>
              {/* const images = this.state.selectedPlace.evidences.map((item, i) =>
              <img>
                style={{ width: "200px", height: "200px" }}
                src="" alt="fire"
              </img> */}
              );
              <img
                style={{ width: "200px", height: "200px" }}
                src="https://efrs.s3.amazonaws.com/evidences/5dc28160e8a69c203002383b/5e48ef75aa7c592b0c9055f5/High+Resolution+Wallpaper+2560X1440+wallpaper+++1012597.jpg?fbclid=IwAR3BCR-6bxiqP7l3dPGjTf2Wjb_XhgHcKKYZXgP8vFxKFkvtTAjXSiDhRYI"
                alt="fire"
              />
            </div>
            <div>
              <h3>Videos</h3>
              <video
                width="320"
                height="240"
                src="https://efrs.s3.amazonaws.com/evidences/5dc28160e8a69c203002383b/5e48d095ab78d90ff4e2c843/1581830293876_demo.mp4"
                controls
              ></video>
              <iframe
                width="200"
                height="200"
                title="Fire video"
                src="https://efrs.s3.amazonaws.com/…/5e48…/1581830293876_demo.mp4"
              ></iframe>
            </div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDaVnsRo6JaVv_a8XMwB1gAYeMIESGD9p4"
})(MapContainer);
