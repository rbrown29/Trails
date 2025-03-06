function computeCameraPosition(pitch, bearing, targetPos, altitude) {
  const bearingRad = (bearing * Math.PI) / 180;
  const pitchRad = ((90 - pitch) * Math.PI) / 180;
  const lngDiff =
    ((altitude / Math.tan(pitchRad)) * Math.sin(-bearingRad)) / 70000;
  const latDiff =
    ((altitude / Math.tan(pitchRad)) * Math.cos(-bearingRad)) / 110000;

  return { lng: targetPos.lng + lngDiff, lat: targetPos.lat - latDiff };
}

export { computeCameraPosition };
