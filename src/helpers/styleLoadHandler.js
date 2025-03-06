// src/helpers/styleLoadHandler.js

import { bbox } from "@turf/turf";

export function handleStyleLoad(map, coordinates) {
  // Terrain Layer
  map.addSource("terrain-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.terrain-rgb",
    tileSize: 512,
    maxzoom: 14,
  });
  map.setTerrain({ source: "terrain-dem", exaggeration: 1.2 });

  // Hillshade Layer
  map.addSource("hillshade-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.terrain-rgb",
    tileSize: 512,
    maxzoom: 15,
  });
  map.addLayer({
    id: "hillshading",
    source: "hillshade-dem",
    type: "hillshade",
    paint: {
      "hillshade-exaggeration": 0.4,
    },
  });

  // Other Trails in the Area, but not the selected one
  map.addLayer({
    id: "trails",
    type: "line",
    source: "composite",
    "source-layer": "road",
    filter: ["==", "class", "path"],
    paint: {
      "line-color": "#28282B",
      "line-width": 6,
      "line-opacity": 0.9,
      "line-border-color": "#28282B",
    },
  }); // Add a Matte black border

  // Add Highlighted Hiking Trails Layer
  map.addSource("hiking-trails", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Custom Hiking Trail" },
          geometry: {
            type: "LineString",
            coordinates, // Use the trail coordinates
          },
        },
      ],
    },
  });

  // Glow Outline for Hiking Trails
  map.addLayer({
    id: "hiking-trails-glow",
    type: "line",
    source: "hiking-trails",
    paint: {
      "line-color": "#36454F", //  charcoal gray 
      "line-width": ["interpolate", ["linear"], ["zoom"], 10, 4, 16, 12],
      "line-opacity": 0.8,
      "line-blur": 5,
    },
  });

  // Dashed Hiking Trail Layer
  map.addLayer({
    id: "hiking-trails-layer",
    type: "line",
    source: "hiking-trails",
    paint: {
      "line-color": "#FFFFFA", // White
      "line-width": ["interpolate", ["linear"], ["zoom"], 10, 2, 16, 6],
      "line-opacity": 0.8,
      "line-dasharray": [2, 1],
    },
  });

  // The route line
  const routeGeoJSON = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates,
    },
    properties: {},
  };

  map.addSource("route", {
    type: "geojson",
    data: routeGeoJSON,
    lineMetrics: true,
  });
  map.addLayer({
    id: "route-line",
    type: "line",
    source: "route",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "rgb(180,255,0)", // Florescent Green
      "line-width": 8,
    },
  });

  // Fit to the route bounding box (the "load view")
  const routeBbox = bbox(routeGeoJSON);
  map.fitBounds(routeBbox, { padding: 40, maxZoom: 20, duration: 2000 });
}
