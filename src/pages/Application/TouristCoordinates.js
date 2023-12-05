import { map } from "leaflet";
import "leaflet/dist/leaflet.css";

import React, { useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
function TouristCoordinates() {
  const [position, setPosition] = useState(null);
  const map = useMap({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You Are Here</Popup>
    </Marker>
  );
}

export default TouristCoordinates;
