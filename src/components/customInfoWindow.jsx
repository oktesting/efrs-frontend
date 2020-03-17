import React from "react";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import "@github/time-elements";
import { InfoWindow } from "react-google-maps";
import Popup from "reactjs-popup";

const CustomInfoWindow = ({
  onCloseInfoWindow,
  selectedPlace,
  images,
  videos
}) => {
  return (
    <InfoWindow
      onCloseClick={onCloseInfoWindow}
      position={{
        lat: selectedPlace.latitude,
        lng: selectedPlace.longtitude
      }}
    >
      <div className="infoWindow">
        <Popup
          trigger={
            <button className="btn btn-primary btn-sm mr-1">Actions</button>
          }
          modal
          closeOnDocumentClick
        >
          <div>
            Pick action&nbsp;&nbsp;
            <button
              className="btn btn-danger btn-sm mr-1"
              onClick={() => {
                alert("alo");
              }}
            >
              Group
            </button>
            <button
              className="btn btn-danger btn-sm mr-1"
              onClick={() => {
                alert("alo");
              }}
            >
              Delete
            </button>
          </div>
        </Popup>
        <h3>User infomation</h3>
        <div
          className="alert alert-danger row"
          style={{ marginRight: "0px" }}
          role="alert"
        >
          <div className="col align-self-center">
            <h6>Name: {selectedPlace.user.fullname}</h6>
            <h6>Phone: {selectedPlace.user.phone}</h6>
            <h6>Status: {selectedPlace.status}</h6>
            <h6>
              Created at:&nbsp;
              <time-ago datetime={selectedPlace.createdAt}>
                {selectedPlace.createdAt}
              </time-ago>
            </h6>
          </div>
          <div className="col">
            <img
              className="infoImg rounded-circle"
              src={selectedPlace.user.avatar}
              alt="avatar is not found"
            />
          </div>
        </div>
        <h3>Image</h3>
        <div>
          {images != null && images.length !== 0 ? (
            <AwesomeSlider cssModule={AwesomeSliderStyles}>
              {images.map((item, i) => (
                <div key={i} data-src={item.location} href={item.location} />
              ))}
            </AwesomeSlider>
          ) : (
            <h6> There is no provided image </h6>
          )}
        </div>
        <h3>Video</h3>
        <div>
          {videos != null && videos.length !== 0 ? (
            videos.map((item, i) => (
              <span className="displayInline" key={i}>
                <video
                  className="infoVideo"
                  src={item.location}
                  controls
                ></video>
              </span>
            ))
          ) : (
            <h6>There is no provided video</h6>
          )}
        </div>
      </div>
    </InfoWindow>
  );
};

export default CustomInfoWindow;
