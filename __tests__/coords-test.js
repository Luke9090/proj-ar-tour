const { latLonToMerc, arPosFromMercs, distanceToModel } = require('../js/utils/coords');

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
