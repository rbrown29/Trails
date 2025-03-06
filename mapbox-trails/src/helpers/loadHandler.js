// src/helpers/loadHandler.js

import mapboxgl from "mapbox-gl";
import { lineString, along, length, bbox } from "@turf/turf";
import { computeCameraPosition } from "../utils/cameraUtils.js";
import { haversineDistance } from "../utils/haversineDistance.js";

export function handleLoad(map, trail, coordinates, animationReqId) {
  const routeDistanceKm = length(lineString(coordinates));
  const routeDistanceMiles = length(lineString(coordinates), {
    units: "miles",
  });

  // Decide speed => total animation time
  const speedMilesPerSec = 0.09;
  const animationDuration = (routeDistanceMiles / speedMilesPerSec) * 1000;

  // Marker + popup
  const popup = new mapboxgl.Popup({
    closeButton: false,
    offset: [0, -12],
  });

  // A custom circle marker
  const circleEl = document.createElement("div");
  circleEl.style.width = "15px";
  circleEl.style.height = "15px";
  circleEl.style.backgroundColor = "#2b2b2b";
  circleEl.style.border = "2px solid #fff";
  circleEl.style.borderRadius = "50%";
  circleEl.style.opacity = "0.5";

  const marker = new mapboxgl.Marker({ element: circleEl })
    .setLngLat(coordinates[0])
    .setPopup(popup)
    .addTo(map);
  marker.togglePopup(); 

  let startTime = null;
  const cameraAltitude = trail.cameraAltitude ?? 2000; // fallback cameraAltitude if not provided
  let currentDistance = 0;
  let previousPoint = { lat: trail.data[0].lat, lon: trail.data[0].lon };

  function frame(time) {
    if (!startTime) startTime = time;

    const rawPhase = (time - startTime) / animationDuration;
    let phase = Math.max(0, Math.min(1, rawPhase));
    if (phase >= 1) phase = 1;

    // along
    const posKM = routeDistanceKm * phase;
    const alongCoords = along(lineString(coordinates), posKM).geometry.coordinates;
    const targetPos = { lng: alongCoords[0], lat: alongCoords[1] };

    // bearing from dynamicBearing down to (dynamicBearing - 200)
    const bearing = (trail.bearing ?? 90) - phase * 200;
    // pitch from dynamicPitch => dynamicPitch + 20 (or just dynamicPitch if you want)
    const pitch = trail.pitch ?? 30;

    const cameraPos = computeCameraPosition(
      pitch,
      bearing,
      targetPos,
      cameraAltitude
    );
    const camera = map.getFreeCameraOptions();
    camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
      cameraPos,
      cameraAltitude
    );
    camera.lookAtPoint(targetPos);
    map.setFreeCameraOptions(camera);

    // Measure distance for popup
    if (
      previousPoint.lat !== targetPos.lat ||
      previousPoint.lon !== targetPos.lng
    ) {
      currentDistance += haversineDistance(previousPoint, {
        lat: targetPos.lat,
        lon: targetPos.lng,
      });
      previousPoint = { lat: targetPos.lat, lon: targetPos.lng };
    }

    marker.setLngLat(targetPos);
    const elevation = Math.floor(
      map.queryTerrainElevation(targetPos, { exaggerated: false }) || 0
    );
    popup.setHTML(
      `${trail.name}<br/>${elevation} ft<br/>${currentDistance.toFixed(
        2
      )} miles`
    );

    // line-gradient with step
    const eps = 1e-6;
    let stepVal = phase;
    if (stepVal <= 0) stepVal = eps;
    if (stepVal >= 1) stepVal = 1 - eps;

    map.setPaintProperty("route-line", "line-gradient", [
      "step",
      ["line-progress"],
      "rgb(180,255,0)",
      stepVal,
      "rgba(255, 0, 0, 0)",
    ]);

    // WHEN animation done => return to load view
    if (phase >= 1) {
      // short pause
      setTimeout(() => {
        // Compute routeBbox using Turf.js
        const routeBbox = bbox(lineString(coordinates));
        if (routeBbox) {
          map.fitBounds(routeBbox, {
            padding: 40,
            maxZoom: 16,
            duration: 2000,
          });
        }
      }, 100); // 100ms pause
    } else {
      animationReqId.current = requestAnimationFrame(frame);
    }
  }

  animationReqId.current = requestAnimationFrame(frame);
}

