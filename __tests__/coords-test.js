const { latLonToMerc, arPosFromMercs, distanceToModel, findHeading } = require('../js/utils/coords');

describe('latLonToMerc', () => {
  it('returns an array of two numbers when passed an array containing a valid latitude and longitude', () => {
    expect(latLonToMerc([53486233, -2.241182]).length).toBe(2);
    expect(typeof latLonToMerc([53486233, -2.241182])[0]).toBe('number');
    expect(typeof latLonToMerc([53486233, -2.241182])[1]).toBe('number');
  });
  it('returns correct x values when passed an array containing a valid latitude and longitude', () => {
    expect(latLonToMerc([53.486233, -2.241182])[0]).toBe(7073449.2);
  });
  it('returns correct z values when passed an array containing a valid latitude and longitude', () => {
    expect(latLonToMerc([53.486233, -2.241182])[1]).toBe(-249487.2);
  });
});

describe('distanceToModel', () => {
  it('returns correct distance when displacement is only in one direction', () => {
    expect(distanceToModel([23, 27], [23, 34])).toBe(7);
  });
  it('returns correct distance when displacement is in two directions', () => {
    expect(distanceToModel([23, 27], [27, 30])).toBe(5);
  });
  it('returns correct distance when displacement is negative', () => {
    expect(distanceToModel([23, 34], [23, 27])).toBe(7);
    expect(distanceToModel([27, 30], [23, 27])).toBe(5);
  });
});

describe('arPosFromMercs', () => {
  it('returns an array of three numbers', () => {
    expect(arPosFromMercs([23, 27], [27, 30]).length).toBe(3);
    expect(typeof arPosFromMercs([23, 27], [27, 30])[0]).toBe('number');
    expect(typeof arPosFromMercs([23, 27], [27, 30])[1]).toBe('number');
    expect(typeof arPosFromMercs([23, 27], [27, 30])[2]).toBe('number');
  });
  it('returns correct displacements', () => {
    expect(arPosFromMercs([23, 27], [27, 30])).toEqual([4, 0, 3]);
  });
  it('returns correct negative displacements', () => {
    expect(arPosFromMercs([27, 30], [23, 27])).toEqual([-4, 0, -3]);
  });
});

describe('findHeading', () => {
  const PI = Math.PI;
  it('returns a number when passed two arrays of x and z coordinates', () => {
    expect(typeof findHeading([0, 0], [1, 3])).toBe('number');
  });
  it('returns a correct bearing from West when passed coordinates giving a cardinal direction', () => {
    expect(findHeading([1, 1], [1, 2])).toBe(PI); // East
    expect(findHeading([1, 1], [1, 0])).toBe(0); // West
    expect(findHeading([1, 1], [2, 1])).toBe(PI / 2); // North
    expect(findHeading([1, 1], [0, 1])).toBe(PI * 1.5); // South
  });
  it('returns a correct bearing from West when passed coordinates giving an intercardinal direction', () => {
    expect(findHeading([1, 1], [0, 0])).toBe(PI * 1.75); // SW
    expect(findHeading([1, 1], [2, 0])).toBe(PI * 0.25); // NW
    expect(findHeading([1, 1], [2, 2])).toBe(PI * 0.75); // NE
    expect(findHeading([1, 1], [0, 2])).toBe(PI * 1.25); // SE
  });
});
