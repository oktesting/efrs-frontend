import React from "react";
import { Marker } from "google-maps-react";

const CustomMarker = ({ item }) => {
  return (
    <Marker
      key={item._id}
      position={{
        lat: item.latitude,
        lng: item.longtitude
      }}
    ></Marker>
  );
};

export default CustomMarker;
