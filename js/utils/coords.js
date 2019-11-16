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
  return (deltaX ** 2 + deltaY ** 2) ** 0.5;
};

module.exports = coords;
