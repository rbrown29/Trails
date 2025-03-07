// src/components/Sidebar.jsx
import "react";
import PropTypes from "prop-types";
import { CyberEl6 } from "react-cyber-elements";
import "./Sidebar.css";

function Sidebar({ trailsData, selectedTrailIndex, setSelectedTrailIndex }) {
  
  // Sort trails by name in Alphabetical order
  const sortedTrails = trailsData.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
     id="sidebar"
      style={{
        width: 250,
        padding: "1rem",
        borderRight: "2px solid #333",
        overflowY: "auto",
        background: "rgba(30, 41, 82, 1)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        zIndex: 1,
      }}
    >
      <h3
        style={{
          color: "#faf6f674",
          fontSize: "1rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        <CyberEl6
         id="cyberEl6"
          style={{ width: "50px", height: "50px", marginLeft: "6rem" }}
        />
      </h3>
      {sortedTrails.map((trail, i) => (
        <div
        id="trail"
          key={i}
          style={{
            margin: "0.5rem 0",
            padding: "0.5rem",
            background: i === selectedTrailIndex ? "#242424" : "#1E2952",
            borderRadius: 4,
            cursor: "pointer",
            color: "#faf6f674",
            border: "2px solid #333",
          }}
          onClick={() => setSelectedTrailIndex(i)}
        >
          {trail.name}
        </div>
      ))}
    </div>
  );
}

Sidebar.propTypes = {
  trailsData: PropTypes.array.isRequired,
  selectedTrailIndex: PropTypes.number,
  setSelectedTrailIndex: PropTypes.func.isRequired,
};

export default Sidebar;
