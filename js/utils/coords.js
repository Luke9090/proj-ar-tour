const coords = {};

coords.latLonToMerc = ([lat, lon]) => {
  const latRad = lat * (Math.PI / 180);
  const lonRad = lon * (Math.PI / 180);
  const eqRadius = 6378137;
  let x = Math.log((1 + Math.sin(latRad)) / Math.cos(latRad)) * eqRadius;
  let z = lonRad * eqRadius;
  x = Math.round(x * 10) / 10;
  z = Math.round(z * 10) / 10;
  return [x, z];
};

coords.arPosFromMercs = (currLoc, modelLoc) => {
  const x = modelLoc[0] - currLoc[0];
  const y = 0;
  const z = modelLoc[1] - currLoc[1];
  return [x, y, z];
};

coords.distanceToModel = (currLoc, modelLoc) => {
  const deltaX = modelLoc[0] - currLoc[0];
  const y = 0;
  const deltaY = modelLoc[1] - currLoc[1];
  return Math.round((deltaX ** 2 + deltaY ** 2) ** 0.5);
};

coords.findHeading = (start, end) => {
  // nominally heading West [0,-1]
  const x = end[0] - start[0];
  const z = end[1] - start[1];
  const atanRes = Math.atan(x / z);
  if (x === 0) return z < 0 ? 0 : Math.PI; // If x is 0, heading is due West or East
  if (z === 0) return x > 0 ? Math.PI / 2 : Math.PI * 1.5; // If z is 0, heading is due North or South
  return x > 0 ? atanRes + Math.PI / 2 : atanRes + Math.PI * 1.5;
};

coords.mercsFromPolar = ([angle, distance], startPos) => {
  const x = startPos[0] + distance * Math.sin(angle);
  const z = startPos[2] - distance * Math.cos(angle);
  const y = startPos[1];
  return [x, y, z];
};

module.exports = coords;
