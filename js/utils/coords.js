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
  const deltaZ = modelLoc[modelLoc.length - 1] - currLoc[currLoc.length - 1];
  return Math.round((deltaX ** 2 + deltaZ ** 2) ** 0.5);
};

coords.findHeading = (start, end) => {
  // nominally heading West [0,-1]
  const PI = Math.PI;
  const x = end[0] - start[0];
  const z = end[1] - start[1];
  const atanRes = Math.atan(x / z);
  if (x === 0) return z < 0 ? 0 : PI; // If x is 0, heading is due West or East
  if (z === 0) return x > 0 ? PI / 2 : PI * 1.5; // If z is 0, heading is due North or South
  if (x > 0) return z < 0 ? -atanRes : PI - atanRes;
  return z < 0 ? PI * 2 - atanRes : PI - atanRes;
};

coords.mercsFromPolar = ([angle, distance]) => {
  if (angle < 0) angle += 2 * Math.PI;
  const x = distance * Math.sin(angle);
  const z = -distance * Math.cos(angle);
  const y = 0;
  return [x, y, z];
};

module.exports = coords;
