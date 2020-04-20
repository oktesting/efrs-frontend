import React from "react";
import { useState } from "react";
import tickMarker from "../../media/tick.svg";
import fireMarker from "../../media/fire.svg";
import extinguisherMarker from "../../media/fire-extinguisher.svg";
import stationMarker from "../../media/fire-station.svg";
import { mapStyles } from "../../config.json";

import CustomInfoWindow from "./customInfoWindow";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";

const defaultMapOptions = {
  styles: mapStyles,
  gestureHandling: "greedy",
};

function Map(props) {
  const [selectedFire, setSelectedFire] = useState(null);
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  document.title = "Giám Sát Bản Đồ";
  return (
    <GoogleMap
      defaultCenter={props.stationCenter}
      defaultZoom={15}
      defaultOptions={defaultMapOptions}
      onClick={() => setSelectedFire(null)}
    >
      <Marker
        animation={window.google.maps.Animation.DROP}
        position={props.stationCenter}
        icon={{
          scaledSize: new window.google.maps.Size(35, 35),
          url: stationMarker,
        }}
      />
      {props.fires.map((item) => (
        <Marker
          animation={
            item.status === "pending"
              ? window.google.maps.Animation.BOUNCE
              : window.google.maps.Animation.DROP
          }
          key={item._id}
          position={{ lat: item.latitude, lng: item.longtitude }}
          icon={{
            scaledSize: new window.google.maps.Size(35, 35),
            url:
              item.status === "pending"
                ? fireMarker
                : item.status === "processing"
                ? extinguisherMarker
                : tickMarker,
          }}
          onClick={() => {
            setSelectedFire(item);
            setImages(
              item.evidences.filter(
                (evidence) => evidence.mimetype !== "video/mp4"
              )
            );
            setVideos(
              item.evidences.filter(
                (evidence) => evidence.mimetype === "video/mp4"
              )
            );
          }}
        />
      ))}
      {selectedFire && (
        <CustomInfoWindow
          selectedFire={selectedFire}
          images={images}
          videos={videos}
          onCloseInfoWindow={() => setSelectedFire(null)}
          handleDeleteFire={props.handleDeleteFire}
          handleChangeStatusFire={props.handleChangeStatusFire}
        />
      )}
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
