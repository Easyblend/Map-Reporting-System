import React, { useEffect, useState } from "react";

import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
//Leaflet Imports
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

import { toast } from "react-toastify";

import Loading from "./Components/Loading";

import AddMarker from "./Components/AddMarker";
import NavbarComponent from "./NavbarComponent";

import { Form, Button } from "react-bootstrap";

const Home = () => {
  const [center, setCenter] = useState();
  const [addmarker, setAddmarker] = useState(false);

  const [name, setName] = useState("");
  const [incidentLocation, setIncidentLocation] = useState();

  const [cityName, setCityName] = useState("searching...");

  const [markers, setMarkers] = useState();
  const fetchCityName = async (lat, lon) => {
    // const response = await fetch(
    //   `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=f46a8be772d9e8a8f927576bcf650eb5`
    // );
    // const data = await response.json();
    // setCityName(data[0].name);
  };

  //User Location is fetched and set as the maps center
  const getUser = () => {
    onAuthStateChanged(authentication, (currentUser) => {
      setName(currentUser.displayName);
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      toast.error("Allow Location To View Map");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {center ? (
        <>
          <div className="sidebar p-4 d-flex flex-column gap-3">
            <NavbarComponent />

            {addmarker ? (
              <>
                <Form className="h-100 bg-dark p-3 rounded-4">
                  <p className="text-light fw-bolder text-center">
                    {" "}
                    {cityName.toUpperCase()}
                  </p>

                  <div className="d-flex gap-2 text-light">
                    <p>
                      Lat :{" "}
                      <span className="text-dark bg-light px-2 py-1 fw-bold rounded-2">
                        {incidentLocation.lat.toFixed(3)}
                      </span>
                    </p>
                    <p>
                      Lon :{" "}
                      <span className="text-dark bg-light px-2 py-1 fw-bold rounded-2">
                        {incidentLocation.lng.toFixed(3)}
                      </span>
                    </p>
                  </div>
                  <div className="form-container">
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Text className="text-muted">
                        Reporter's Name
                      </Form.Text>
                      <Form.Control
                        type="text"
                        placeholder={name}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="incidence">
                      <Form.Text className="text-muted">
                        Ongoing Incidence
                      </Form.Text>
                      <Form.Control
                        type="text"
                        placeholder="eg: fire Outbreak"
                      />
                    </Form.Group>
                  </div>

                  <div className="d-flex gap-3 mx-auto">
                    <Button variant="primary" type="submit">
                      Report
                    </Button>
                    <Button
                      variant="primary"
                      className="text-dark bg-light"
                      onClick={() => {
                        setAddmarker(false);
                        setMarkers(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </>
            ) : (
              ""
            )}
          </div>
          <MapContainer center={center} zoom={13} className="map-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={center}>
              <Popup>
                <h5 className="text-primary">Youre Here</h5>
              </Popup>
            </Marker>

            {/* Add Marker Component is created here */}
            <AddMarker
              setAddmarker={setAddmarker}
              setIncidentLocation={setIncidentLocation}
              setCityName={setCityName}
              fetchCityName={fetchCityName}
              setMarkers={setMarkers}
              markers={markers}
              cityName={cityName}
            />
          </MapContainer>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
