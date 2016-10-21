import { expect } from 'chai';

import selector from './mapSelector';

function getState({ units = {}, city = '', postalCodes = [] }) {
  return { data: { units }, filters: { city, postalCodes } };
}

function createUnit(id, latitude, longitude, { city = 'Helsinki', addressZip = '00100' } = {}) {
  return Object.assign(
    { id, coordinates: { latitude, longitude } },
    { city, addressZip }
  );
}

const padding = 0.004;

describe('screens/map/mapSelector', () => {
  describe('markers', () => {
    it('are returned', () => {
      const data = selector(getState({
        units: {
          21: createUnit(21, 0, 1),
          1: createUnit(1, 2, 3),
        },
      }));
      expect(data.markers).to.deep.equal([
        { id: '1', latitude: 2, longitude: 3 },
        { id: '21', latitude: 0, longitude: 1 },
      ]);
    });

    it('are filtered by city', () => {
      const data = selector(getState({
        units: {
          21: createUnit(21, 0, 1, { city: 'Helsinki' }),
          1: createUnit(1, 2, 3, { city: 'Espoo' }),
        },
        city: 'Espoo',
      }));
      expect(data.markers).to.deep.equal([
        { id: '1', latitude: 2, longitude: 3 },
      ]);
    });

    it('are not filtered by city if city filter is ""', () => {
      const data = selector(getState({
        units: {
          21: createUnit(21, 0, 1, { city: 'Helsinki' }),
          1: createUnit(1, 2, 3, { city: 'Espoo' }),
        },
        city: '',
      }));
      expect(data.markers).to.deep.equal([
        { id: '1', latitude: 2, longitude: 3 },
        { id: '21', latitude: 0, longitude: 1 },
      ]);
    });

    it('are filtered by postal code', () => {
      const data = selector(getState({
        units: {
          21: createUnit(21, 0, 1, { addressZip: '00100' }),
          1: createUnit(1, 2, 3, { addressZip: '00200' }),
          3: createUnit(3, 2, 3, { addressZip: '00300' }),
        },
        postalCodes: ['00200', '00300'],
      }));
      expect(data.markers).to.deep.equal([
        { id: '1', latitude: 2, longitude: 3 },
        { id: '3', latitude: 2, longitude: 3 },
      ]);
    });

    it('are not filtered by postal code if postalCodes is []', () => {
      const data = selector(getState({
        units: {
          21: createUnit(21, 0, 1, { addressZip: '00100' }),
          1: createUnit(1, 2, 3, { addressZip: '00200' }),
          3: createUnit(3, 2, 3, { addressZip: '00300' }),
        },
        postalCodes: [],
      }));
      expect(data.markers).to.deep.equal([
        { id: '1', latitude: 2, longitude: 3 },
        { id: '21', latitude: 0, longitude: 1 },
        { id: '3', latitude: 2, longitude: 3 },
      ]);
    });

    it('are filtered by postal code and city', () => {
      const data = selector(getState({
        units: {
          21: createUnit(21, 0, 1, { city: 'Helsinki', addressZip: '00100' }),
          1: createUnit(1, 2, 3, { city: 'Espoo', addressZip: '02100' }),
          3: createUnit(3, 2, 3, { city: 'Espoo', addressZip: '02200' }),
        },
        city: 'Espoo',
        postalCodes: ['02100', '00100'],
      }));
      expect(data.markers).to.deep.equal([
        { id: '1', latitude: 2, longitude: 3 },
      ]);
    });
  });

  it('returns boundaries', () => {
    const data = selector(getState({
      units: {
        1: createUnit(1, 5, 5),
        2: createUnit(2, 0, 10),
        3: createUnit(3, 3, 3),
        4: createUnit(4, 5, 8),
      },
    }));
    expect(data.boundaries).to.deep.equal({
      maxLatitude: 5 + padding,
      minLatitude: 0 - padding,
      maxLongitude: 10 + padding,
      minLongitude: 3 - padding,
    });
  });

  describe('isLoaded', () => {
    it('is true if has units', () => {
      const data = selector(getState({ units: { 1: createUnit(1, 1, 1) } }));
      expect(data.isLoaded).to.be.true;
    });

    it('is false if no units', () => {
      const data = selector(getState({ units: {} }));
      expect(data.isLoaded).to.be.false;
    });

    it('is true if has units but none match filters', () => {
      const data = selector(getState({
        units: { 1: createUnit(1, 5, 5, { city: 'Helsinki' }) },
        city: 'Espoo',
      }));
      expect(data.isLoaded).to.be.true;
    });
  });
});
