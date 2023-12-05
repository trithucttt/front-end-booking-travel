import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon,
  GeoJSON,
  Polyline,
  LayersControl,
  LayerGroup,
  Circle,
  FeatureGroup,
  Rectangle,
} from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon-2x.png";
import L, { Icon } from "leaflet";
import geojsonData from "./geojsonData.json";
import axios from "axios";
import "./Travel.css";

function Travel() {
  const [popupInfo, setPopupInfo] = useState(null);
  const customIcon = new Icon({
    iconUrl: icon,
    iconSize: [38, 38],
  });

  const onEachFeature = (feature, layer) => {
    // Check if the feature has a name property
    if (feature.properties && feature.properties.ten_tinh) {
      // Bind a popup with the name as the content
      layer.bindPopup(
        `<h1>${feature.properties.ten_tinh}</h1><h2 style={{ color: '#777' }}>Income: ${feature.properties.Income}</h2>`
      );
      layer.on("click", (e) =>
        setPopupInfo({
          name: feature.properties.ten_tinh,
          coordinates: e.latlng,
        })
      );
      // layer.on("click", (e) => {
      //   const InfClick = e.latlng;
      //   const newMarker = {
      //     lat: InfClick.lat,
      //     lng: InfClick.lng,
      //   };
      //   setMarkers([...markers, newMarker]);
      // //  console.log(InfClick);
      //  // console.log([...markers, newMarker]);
      // });
      // layer.on("click", (markers) => {
      //   console.log(`Clicked Marker ${+ 1}:`, markers);

      //   // Nếu có ít nhất 2 điểm, tạo đường nối
      //   if (markers.length >= 2) {
      //     const startPoint = markers[markers.length - 2];
      //     const endPoint = markers[markers.length - 1];

      //     // Tạo đường nối giữa hai điểm
      //     const line = {
      //       start: startPoint,
      //       end: endPoint,
      //     };

      //     // Xử lý đường nối, ví dụ: hiển thị thông tin
      //     console.log("Line:", line);
      //   }

      // })

      //layer.bindPopup('fwafwef');
    }
  };

  const polygonCoords = [
    [10.031591, 105.769168],
    [10.030957, 105.768696],
    [10.030619, 105.769104],
    [10.031284, 105.769608],
    [10.031591, 105.769168],
  ];

  const polylineCoords = [
    [10.03027, 105.772119],
    [10.031157, 105.771035],
    // Add more coordinates as needed
  ];
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);
  const onMarkerClick = (index) => {
    setSelectedMarker(index);
  };
  const [geometryData, setGeometryData] = useState([]);
  const [geometryMarkers, setGeometryMarkers] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8086/api/geometry/all"
        );
        const mappedData = response.data.map((item) => ({
          id: item[0],
          name: item[1],
          geometry: item[2],
        }));
        setGeometryData(mappedData);
        //console.log(mappedData);
        // const markersFromGeometry = mappedData.map((feature) => {
        //   const coordinates = feature.geometry
        //     .match(/\(([^)]+)\)/)[1]
        //     .split(" ")
        //     .map((coord) => parseFloat(coord));

        //   return {
        //     lat: coordinates[1],
        //     lng: coordinates[0],
        //   };
        // });
        // setGeometryMarkers(markersFromGeometry);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchPost();
  }, []);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [markers, setMarkers] = useState([]);

  const handleMarkerClick = (coordinates, name) => {
    const newMarker = {
      lat: coordinates.lat,
      lng: coordinates.lng,
      name: name,
    };
    console.log(coordinates.lat, coordinates.lng);
    setMarkers([...markers, newMarker]);

    // Nếu có ít nhất 2 điểm, tạo đường nối
    if (markers.length >= 2) {
      const startPoint = markers[markers.length - 2];
      const endPoint = markers[markers.length - 1];
      const startLatLng = [startPoint.lat, startPoint.lng];
      const endLatLng = [endPoint.lat, endPoint.lng];
      // Tạo đường nối giữa hai điểm
      const line = {
        start: startLatLng,
        end: endLatLng,
      };

      // Xử lý đường nối, ví dụ: hiển thị thông tin
      console.log("Line:", line);
    }
  };
  const toggleMarkerSelection = (index) => {
    const updatedSelectedMarkers = [...selectedMarkers];
    const markerIndex = updatedSelectedMarkers.indexOf(index);
    if (markerIndex === -1) {
      updatedSelectedMarkers.push(index);
    } else {
      updatedSelectedMarkers.splice(markerIndex, 1);
    }
    setSelectedMarkers(updatedSelectedMarkers);
  };
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 0,
          zIndex: 1000,
          width: "100px",
        }}
      >
        {/* <label>Select Marker:</label> */}
        <select
          className="customComboBox"
          onChange={(e) => onMarkerClick(parseInt(e.target.value))}
          value={selectedMarker !== null ? selectedMarker : ""}
        >
          <option value="" disabled>
            Select Marker
          </option>
          {geometryData.map((feature, index) => (
            <option key={index} value={index}>
              {feature.name}
            </option>
          ))}
        </select>
      </div>

      <MapContainer
        center={[10.030249, 105.772097]}
        zoom={16}
        style={{ width: "100vw", height: "100vh" }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <MyComponent /> */}
        <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Marker With Popup">
            <Marker position={[10.03239, 105.770076]} icon={customIcon}>
              <Popup>My popup</Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Layer Group with circles">
            <LayerGroup>
              <Circle
                center={[10.029557454839386, 105.76971223110003]}
                pathOptions={{ fillColor: "blue" }}
                radius={50}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Feature Group ">
            <FeatureGroup pathOptions={{ color: "green" }}>
              <Popup>Popup in Feature Group</Popup>
              <Circle
                center={[10.030194217158849, 105.77074173001472]}
                radius={60}
              />
              {/* <Rectangle bounds={rectangle} /> */}
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>

        {popupInfo && (
          <Popup
            position={[popupInfo.coordinates.lat, popupInfo.coordinates.lng]}
          >
            <p>{popupInfo.name}</p>
            <p>Latitude: {popupInfo.coordinates.lat}</p>
            <p>Longitude: {popupInfo.coordinates.lng}</p>
          </Popup>
        )}

        {popupInfo && (
          <Marker
            position={[popupInfo.coordinates.lat, popupInfo.coordinates.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () =>
                handleMarkerClick(popupInfo.coordinates, popupInfo.name),
            }}
          >
            <p>{popupInfo.name}</p>
            <p>Latitude: {popupInfo.coordinates.lat}</p>
            <p>Longitude: {popupInfo.coordinates.lng}</p>
          </Marker>
        )}

        {/* {markers.map((marker, index) => (
          <Marker
          icon={customIcon}
            key={index}
            position={[marker.lat , marker.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(popupInfo.coordinates),
            }}
          >
            <Popup>
              <p>{`Position ${index + 1}`}</p>
              <p>Latitude: {marker.lat}</p>
              <p>Longitude: {marker.lng}</p>
            </Popup>
          </Marker>
        ))} */}

        {/* Nối các điểm lại với nhau có sẵn và điểm tạo mới*/}
        {markers.length >= 2 && (
          <Polyline
            positions={markers.map((marker) => [marker.lat, marker.lng])}
            color="blue"
            weight={3}
          />
        )}
        {/* nối các điểm với dữ liệu từ server */}
        {geometryMarkers.length >= 2 && (
          <Polyline
            positions={geometryMarkers.map((marker) => [
              marker.lat,
              marker.lng,
            ])}
            color="blue"
            weight={3}
          />
        )}
        {/* nối các điểm từ danh sách đuọc chọn */}
        {markers.length >= 2 && (
          <Polyline
            positions={selectedMarkers.map((index) => {
              const coordinates = geometryData[index].geometry
                .match(/\(([^)]+)\)/)[1]
                .split(" ")
                .map((coord) => parseFloat(coord));
              return [coordinates[1], coordinates[0]];
            })}
            color="blue"
            weight={3}
          />
        )}
        
        <Polyline
          positions={polylineCoords}
          color="blue"
          eventHandlers={{
            click: (e) =>
              setPopupInfo({ name: "Đường vào cổng A", coordinates: e.latlng }),
          }}
        />

        <Polygon
          positions={polygonCoords}
          color="red"
          eventHandlers={{
            click: (e) =>
              setPopupInfo({
                name: "Trường CNTT và TT",
                coordinates: e.latlng,
              }),
          }}
        />
        <Marker
          position={[10.030249, 105.772097]}
          icon={customIcon}
          eventHandlers={{
            click: () =>
              handleMarkerClick({
                lat: popupInfo ? popupInfo.coordinates.lat : 10.030249,
                lng: popupInfo ? popupInfo.coordinates.lng : 105.772097,
              }),
          }}
        >
          {popupInfo && (
            <Popup
              position={[popupInfo.coordinates.lat, popupInfo.coordinates.lng]}
            >
              <p>CỔng A ĐHCT</p>
              <p>Latitude: {popupInfo.coordinates.lat}</p>
              <p>Longitude: {popupInfo.coordinates.lng}</p>
              {/* Add other information as needed */}
            </Popup>
          )}
        </Marker>
        {geometryData.map((feature, index) => {
          // console.log(feature.geometry)
          const coordinates = feature.geometry
            .match(/\(([^)]+)\)/)[1]
            .split(" ")
            .map((coord) => parseFloat(coord));

          const latitude = coordinates[1];
          const longitude = coordinates[0];

          return (
            <Marker
              key={index}
              position={[latitude, longitude]}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  toggleMarkerSelection(index);
                  onMarkerClick(index);
                  handleMarkerClick({
                    lat: popupInfo ? popupInfo.coordinates.lat : latitude,
                    lng: popupInfo ? popupInfo.coordinates.lng : longitude,
                  });
                },
              }}
              opacity={selectedMarker === index ? 3 : 0.5}
            >
              <Popup>
                <h3>{feature.name}</h3>
                {/* <p>ID: {feature.id}</p> */}
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* // function MyComponent() {
//   const map = useMapEvents({
//     click: () => {
//       map.locate();
//     },
//     locationfound: (location) => {
//       console.log("location found:", location);
//     },
//   });
//   return null;
// } */}
    </div>
  );
}

export default Travel;


