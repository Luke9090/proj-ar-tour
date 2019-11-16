const { latLonToMerc } = require('../js/utils/coords');

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
