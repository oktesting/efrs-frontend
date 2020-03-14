import React from "react";
import { useState } from "react";
import tickMarker from "../media/tick.svg";
import fireMarker from "../media/fire.svg";
import extinguisherMarker from "../media/fire-extinguisher.svg";
import stationMarker from "../media/fire-station.svg";
import { mapStyles, defaultCenter } from "../config.json";

import CustomInfoWindow from "./customInfoWindow";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from "react-google-maps";

const defaultMapOptions = {
  styles: mapStyles,
  gestureHandling: "greedy"
};

function Map(props) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);

  return (
    <GoogleMap
      defaultCenter={defaultCenter}
      defaultZoom={15}
      defaultOptions={defaultMapOptions}
      onClick={() => setSelectedPlace(null)}
    >
      <Marker
        animation={window.google.maps.Animation.DROP}
        position={defaultCenter}
        icon={{
          scaledSize: new window.google.maps.Size(35, 35),
          url: stationMarker
        }}
      />
      {props.fires.map(item => (
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
                : tickMarker
          }}
          onClick={() => {
            setSelectedPlace(item);
            setImages(
              item.evidences.filter(
                evidence => evidence.mimetype !== "video/mp4"
              )
            );
            setVideos(
              item.evidences.filter(
                evidence => evidence.mimetype === "video/mp4"
              )
            );
          }}
          onRightClick={e => {
            console.log(e["tb"]);
            setSelectedPlace(item);
          }}
        />
      ))}
      {selectedPlace && (
        <CustomInfoWindow
          selectedPlace={selectedPlace}
          images={images}
          videos={videos}
          onCloseInfoWindow={() => setSelectedPlace(null)}
        />
      )}
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
