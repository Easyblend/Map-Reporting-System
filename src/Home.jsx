import React, { useEffect, useState } from "react";

import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";

import { db } from "./FirebaseConfig";

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
  const [incident, setIncident] = useState("");
  const [incidentLocation, setIncidentLocation] = useState();
  const [phone, setPhone] = useState("");

  const [cityName, setCityName] = useState("searching...");
  const [state, setSate] = useState("searching...");
  const [description, setDescription] = useState("");

  const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  //getting Report time
  const currentTime = new Date();
  const time = currentTime.toLocaleTimeString("en-US");

  const [markers, setMarkers] = useState();
  const fetchCityName = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=f46a8be772d9e8a8f927576bcf650eb5`
    );
    const data = await response.json();
    console.log(data);
    setCityName(data[0].name);
    setSate(data[0].state);
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

  const sentData = async (e) => {
    e.preventDefault();
    await toast.promise(
      addDoc(collection(db, "Reported Cases"), {
        date: date,
        time: time,
        reporter: name,
        reporters_location: center,
        incident: incident,
        incidentDescription: description,
        location: cityName,
        state: state,
        incidentLocation: {
          latitude: incidentLocation.lat.toFixed(2),
          longitude: incidentLocation.lng.toFixed(2),
        },
        phone: phone,
      }),
      {
        pending: "Submitting Rpeort",
        success: "Report successfully submitted",
        error: "An issue occured, Try again!",
      }
    );
  };
  return (
    <div>
      {center ? (
        <>
          <div className="sidebar p-4 d-flex flex-column gap-3">
            <NavbarComponent />

            {addmarker ? (
              <>
                <Form
                  className="h-100 bg-dark p-3 rounded-4"
                  onSubmit={sentData}
                >
                  <p className="text-light fw-bolder text-center gy-0 my-0 py-0">
                    {" "}
                    {cityName.toUpperCase()}
                  </p>
                  <p className="text-light mb-4 text-center">{state}</p>

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
                        value={incident}
                        onChange={(e) => {
                          setIncident(e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                    <div className="form-group text-secondary ">
                      <label htmlFor="exampleFormControlTextarea1">
                        Incidence description
                      </label>
                      <textarea
                        required
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="detailed description on the incidence you're reporting on"
                      />
                    </div>
                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Text className="text-muted">
                        Reporter's contact
                      </Form.Text>
                      <Form.Control
                        type="tel"
                        placeholder="eg: 0550104094"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        required
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
