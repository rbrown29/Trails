### This project visualizes hiking trails using Mapbox GL JS. It includes features like real-time distance and elevation updates as the camera moves along the hiking trail.

![Trail](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2xzaGpvYnpueGV4OGxzN3VsMnN1M2hzeGM0OHpqcXdlazY1MjB1eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R1MlWX6NHdJogpH0HO/giphy.gif)

####  Technologies and Links
 - [React](https://react.dev/)
 - [Mapbox](https://www.mapbox.com/)
 - [Node.js](https://nodejs.org/en)
 - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
 - [HTML/CSS](https://developer.mozilla.org/en-US/docs/Web/HTML)
 - [Vite](https://vite.dev/)
 - [Turf.js](https://turfjs.org/)


#### Project Structure
```
/public
  ├── coastline.geojson
  ├── oceans.geojson
  ├── Trails.json
/src
  ├── components
  │   ├── map.jsx
  │   ├── MapContainer.jsx
  │   ├── SideBar.jsx
  ├── helpers
  │   ├── loadHandler.js
  │   ├── styleLoadHandler.js
  ├── hooks
  │   ├── useTrails.js
  ├── utils
  │   ├── cameraUtils.js
  |   ├── haversineDistance.js
  |   ├── mapboxAccessToken.js
  ├── App.jsx
  ├── App.css
  ├── main.jsx
  └── index.css

```

#### Features

- Real-time Distance Tracking: As the camera moves along the trail, the distance covered is calculated and displayed.

- Elevation Display: The elevation at each point is shown in a popup.

- Mapbox Integration: Utilizes Mapbox's terrain and satellite streets layers for a rich visual experience.


#### How it Works

- Map Initialization: The map is initialized with Mapbox's satellite streets style, centered on the starting point of the trail.

- Animation: The camera moves along the trail, showing the current position's altitude and the distance covered so far.

- Distance Calculation: The distance is calculated using the Haversine formula, which takes into account the curvature of the Earth.

- Side Panel: The side panel displays the trail's name, click on the trail to start the animation.

[Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula)

#### Built With Mapbox

##### 3D Terrain Elevation Map was derived from the following articles and added custom code.

- [Query terrain elevation](https://docs.mapbox.com/mapbox-gl-js/example/query-terrain-elevation/)

- [Building Cinematic Route Animations with MapboxGL](https://www.mapbox.com/blog/building-cinematic-route-animations-with-mapboxgl)

#### Preview

[Trail Walkthrough](https://trailswalkthrough.netlify.app/)