import React from "react";
import NavbarComponent from "./NavbarComponent";

import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  useMapEvent,
  ZoomControl,
  ScaleControl,
  LayersControl,
  AttributionControl,
} from "react-leaflet";
import { useEffect } from "react";
import { useState } from "react";
import { control, icon, Icon, marker } from "leaflet";
import { authentication } from "./FirebaseConfig";
import { Button } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { click } from "@testing-library/user-event/dist/click";

const Home = () => {
  const policePose = new Icon({
    iconUrl: `https://cdn-icons-png.flaticon.com/512/3485/3485494.png`,
    iconSize: [30, 30],
  });

  const [name, setName] = useState();

  const [view, setView] = useState(null);
  const [markers, setMarkers] = useState([]);

  const clicked = [];

  const getUser = async () => {
    await onAuthStateChanged(authentication, (currentUser) => {
      setName(currentUser?.displayName);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setView([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      toast.error("Location not accessible");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  function Home() {
    const map = useMapEvent("click", (location) => {
      setView(location.latlng);
    });
  }

  function NewIdea() {
    const map = useMapEvent("click", (location) => {
      setMarkers((markers) => [...markers, location.latlng]);
    });

    return (
      <>
        {markers.map((eachy) => (
          <Marker position={[eachy.lat, eachy.lng]}>
            <Popup>
              <p>Longitude: {eachy.lng}</p>
              <p>Latitude: {eachy.lat}</p>
            </Popup>
          </Marker>
        ))}
      </>
    );
  }
  return (
    <>
      {view ? (
        <MapContainer
          center={view}
          zoom={13}
          zoomControl={false}
          scrollWheelZoom={false}
          className="leaflet-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
          <Marker position={view}>
            <Popup></Popup>
          </Marker>
          <NewIdea />
          {clicked ? <Home /> : ""}
        </MapContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
