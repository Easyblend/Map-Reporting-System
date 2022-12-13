import React from "react";
import NavbarComponent from "./NavbarComponent";

import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  useMapEvent,
  useMapEvents,
  ZoomControl,
  ScaleControl,
  LayersControl,
  AttributionControl,
} from "react-leaflet";
import { useEffect } from "react";
import { useState } from "react";
import { control, icon, Icon, marker } from "leaflet";
import { authentication } from "./FirebaseConfig";
import { Button, Form } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { click } from "@testing-library/user-event/dist/click";

const Home = () => {
  const policePost = new Icon({
    iconUrl: `https://cdn-icons-png.flaticon.com/512/3485/3485494.png`,
    iconSize: [30, 35],
  });

  const [name, setName] = useState();

  const [center, setcenter] = useState(null);
  const [markers, setMarkers] = useState([]);

  const clicked = [];

  const getUser = async () => {
    onAuthStateChanged(authentication, (currentUser) => {
      setName(currentUser?.displayName);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setcenter([position.coords.latitude, position.coords.longitude]);
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
      map.flyTo(location.latlng, 14);
    });
  }

  function AddMarker() {
    const map = useMapEvent("click", (location) => {
      setMarkers((markers) => [...markers, location.latlng]);
      map.flyTo(location.latlng);
    });

    return (
      <>
        {markers.map((eachy) => (
          <Marker position={[eachy.lat, eachy.lng]} key={eachy.lat}>
            <Popup>
              <Form>
                <Form.Group className="mb-3" controlId="add post">
                  <Form.Control type="text" placeholder="post name" />
                  <Form.Text className="text-muted">
                    Name for the Post youre Adding
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Popup>
          </Marker>
        ))}
      </>
    );
  }
  return (
    <>
      {center ? (
        <MapContainer
          center={center}
          zoom={13}
          zoomControl={false}
          scrollWheelZoom={false}
          className="map-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
          <Marker position={center} icon={policePost}>
            <Popup>
              <h5 className="text-primary">Youre Here</h5>
            </Popup>
          </Marker>
          <AddMarker />
          {clicked ? <Home /> : ""}
        </MapContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
