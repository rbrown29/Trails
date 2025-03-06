import mapboxgl from "mapbox-gl";


mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;


export { mapboxgl };