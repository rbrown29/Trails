// src/components/MapComponent.jsx

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { handleStyleLoad } from "../helpers/styleLoadHandler";
import { handleLoad } from "../helpers/loadHandler";

export default function MapComponent({ trail }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const animationReqId = useRef(null);

  useEffect(() => {
    // If no data => do nothing
    if (!trail.data || trail.data.length === 0) return;

    // Convert to [lng, lat]
    const coordinates = trail.data.map((pt) => [pt.lon, pt.lat]);
    const firstCoord = coordinates[0] || [-117.403, 33.529];

    // Fallback if pitch/bearing not in JSON
    const dynamicPitch = trail.pitch ?? 30;
    const dynamicBearing = trail.bearing ?? 90;

    const isMobile = window.innerWidth <= 768;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12?optimize=true",
      center: firstCoord,
      zoom: 14,
      pitch: isMobile ? 30 : dynamicPitch,
      bearing: isMobile ? 90 : dynamicBearing,
      interactive: false,
      antialias: true,
      pixelRatio: window.devicePixelRatio,
    });
    mapRef.current = map;

    // Handle style.load event using helper
    map.on("style.load", () => {
      handleStyleLoad(map, coordinates);
    });

    // Handle load event using helper
    map.on("load", () => {
      handleLoad(map, trail, coordinates, animationReqId);
    });

    // Capture the current animation request ID for cleanup
    const cleanupAnimation = () => {
      const animationId = animationReqId.current;
      if (animationId) cancelAnimationFrame(animationId);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };

    // Cleanup on unmount
    return () => {
      cleanupAnimation();
    };
  }, [trail]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />;
}

MapComponent.propTypes = {
  trail: PropTypes.shape({
    name: PropTypes.string.isRequired,
    pitch: PropTypes.number,
    bearing: PropTypes.number,
    cameraAltitude: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        lon: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
        ele: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
};


