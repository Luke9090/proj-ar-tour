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

module.exports = coords;
