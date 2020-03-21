import React from "react";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import "@github/time-elements";
import { InfoWindow } from "react-google-maps";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";

const CustomInfoWindow = ({
  onCloseInfoWindow,
  selectedFire,
  images,
  videos,
  handleDeleteFire,
  handleChangeStatusFire
}) => {
  return (
    <InfoWindow
      onCloseClick={onCloseInfoWindow}
      position={{
        lat: selectedFire.latitude,
        lng: selectedFire.longtitude
      }}
    >
      <div className="infoWindow text-center">
        <h3>User infomation</h3>
        <div
          className="alert alert-danger row"
          style={{ marginRight: "0px" }}
          role="alert"
        >
          <div className="col align-self-center">
            <h6>Name: {selectedFire.user.fullname}</h6>
            <h6>Phone: {selectedFire.user.phone}</h6>
            <h6>Status: {selectedFire.status}</h6>
            <h6>
              Created at:&nbsp;
              <time-ago datetime={selectedFire.createdAt}>
                {selectedFire.createdAt}
              </time-ago>
            </h6>
          </div>
          <div className="col">
            <img
              className="infoImg rounded-circle"
              src={selectedFire.user.avatar}
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
        <h3 className="mt-5">Video</h3>
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
        <Popup
          trigger={
            <button className="btn btn-lg btn-primary btn-block mt-3">
              Actions
            </button>
          }
          modal
          closeOnDocumentClick
        >
          <div>
            <h6> Pick action&nbsp;&nbsp;</h6>
            <button
              className="btn btn-warning btn-sm btn-block mr-1"
              onClick={() => {
                selectedFire.status = "processing";
                handleChangeStatusFire(selectedFire._id);
                onCloseInfoWindow();
                toast.success("Fire's status is changed");
              }}
            >
              Change Status
            </button>
            <button
              className="btn btn-danger btn-sm btn-block mr-1"
              onClick={() => {
                handleDeleteFire(selectedFire._id);
                onCloseInfoWindow();
                toast.success("Fire is deleted");
              }}
            >
              Delete This Fire
            </button>
          </div>
        </Popup>
      </div>
    </InfoWindow>
  );
};

export default CustomInfoWindow;
