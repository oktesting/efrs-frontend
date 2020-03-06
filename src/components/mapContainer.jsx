import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Moment from "react-moment";
import "./mapContainer.css";
import image from "../images/1.jpg";

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

  onMarkerClick = (props, marker, e) =>
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
    this.state.fires.map(item => (
      <Marker
        name={item._id}
        key={item._id}
        onClick={this.onMarkerClick}
        position={{
          lat: item.latitude,
          lng: item.longtitude
        }}
        evidences={item.evidences}
      ></Marker>
    ));
  }
  displayEvidence = file => {
    return file.mimetype === "video/mp4" ? (
      <video src={file.location}></video>
    ) : (
      <img src={file.location}></img>
    );
  };

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
            name={item._id}
            key={item._id}
            onClick={this.onMarkerClick}
            position={{
              lat: item.latitude,
              lng: item.longtitude
            }}
            evidences={item.evidences}
            videos={item.evidences.filter(
              evidence => evidence.mimetype === "video/mp4"
            )}
            imgs={item.evidences.filter(
              evidence => evidence.mimetype !== "video/mp4"
            )}
            status={item.status}
            createAt={item.createAt}
            icon={image}
          ></Marker>
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div className="infoWindow">
            <h1>{this.state.selectedPlace.name}</h1>
            <div>Status: {this.state.selectedPlace.status}</div>
            <div>
              Create at: <Moment date={this.state.selectedPlace.createAt} />
            </div>
            <h2>Photo</h2>
            <div>
              {this.state.selectedPlace.evidences ? (
                this.state.selectedPlace.imgs.map(item => (
                  <span className="displayInline" key={item}>
                    <img className="infoImg" src={item.location}></img>
                  </span>
                ))
              ) : (
                <div>alo</div>
              )}
            </div>
            <h2>Video</h2>
            <div>
              {this.state.selectedPlace.evidences ? (
                this.state.selectedPlace.videos.map(item => (
                  <span className="displayInline" key={item}>
                    <video
                      className="infoVideo"
                      src={item.location}
                      controls
                    ></video>
                  </span>
                ))
              ) : (
                <div>alo</div>
              )}
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
