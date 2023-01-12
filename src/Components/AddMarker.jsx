import React from "react";
import { useMapEvent, Marker } from "react-leaflet";
import { Icon } from "leaflet";

const AddMarker = ({
  setAddmarker,
  setIncidentLocation,
  fetchCityName,
  markers,
  setMarkers,
  cityName,
}) => {
  const policePost = new Icon({
    iconUrl: `https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/2x/external-location-meeting-photo3ideastudio-flat-photo3ideastudio.png`,
    iconSize: [50, 55],
  });

  const map = useMapEvent("click", (location) => {
    // setMarkers((markers) => [...markers, location.latlng]); Adding Multiple markers
    setMarkers(location.latlng);
    setAddmarker(true);
    setIncidentLocation(location.latlng);
    map.flyTo(location.latlng, 12);
    fetchCityName(location.latlng.lat, location.latlng.lng);
  });

  return (
    <>
      {/* {markers.map((eachy) => (
        <Marker
          position={[eachy.lat, eachy.lng]}
          icon={policePost}
          key={eachy.lat}
          draggable={tru e}
          autoPan={true}
        >
          <Popup></Popup>
        </Marker>
      ))} LOOPING THROUGH THE MARKERS*/}
      {markers ? (
        <Marker
          position={[markers.lat, markers.lng]}
          icon={policePost}
          key={markers.lat}
          draggable
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AddMarker;
