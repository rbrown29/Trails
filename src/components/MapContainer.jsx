import "react";
import PropTypes from "prop-types";
import MapComponent from "./map.jsx";

const MapContainer = ({ selectedTrail }) => {
  return (
    <div style={{ flex: 1, position: "relative" }}>
      {selectedTrail ? (
        <MapComponent trail={selectedTrail} />
      ) : (
        <div style={{ padding: "1rem", color: "#faf6f674" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            No trail selected
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>
            Please choose a trail from the sidebar.
          </p>
        </div>
      )}
    </div>
  );
};

MapContainer.propTypes = {
  selectedTrail: PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        lon: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
        ele: PropTypes.number,
      })
    ).isRequired,
    pitch: PropTypes.number,
    bearing: PropTypes.number,
    cameraAltitude: PropTypes.number,
  }),
};

export default MapContainer;

