import "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import  "./utils/mapboxgAccessToken.js"
import { useTrails } from "./hooks/useTrails";
import Sidebar from "./components/sideBar.jsx";
import MapContainer from "./components/MapContainer.jsx";

export default function App() {
  // Use the custom hook to get trails data and selection logic
  const { trailsData, selectedTrail, setSelectedTrailIndex } = useTrails();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar for trail selection */}
      <Sidebar
        trailsData={trailsData}
        selectedTrailIndex={selectedTrail ? trailsData.indexOf(selectedTrail) : null}
        setSelectedTrailIndex={setSelectedTrailIndex}
      />

      {/* Main Map */}
      <MapContainer selectedTrail={selectedTrail} />
    </div>
  );
}
