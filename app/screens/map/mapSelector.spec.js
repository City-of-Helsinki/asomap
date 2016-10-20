import { expect } from 'chai';

import selector from './mapSelector';

function getState({ units = {}, city = '' }) {
  return { data: { units }, filters: { city } };
}

function createUnit(id, latitude, longitude, city = 'Helsinki') {
  return { id, coordinates: { latitude, longitude }, city };
}

describe('screens/map/mapSelctor', () => {
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
          21: createUnit(21, 0, 1, 'Helsinki'),
          1: createUnit(1, 2, 3, 'Espoo'),
        },
        city: 'Espoo',
      }));
      expect(data.markers).to.deep.equal([
        { id: '1', latitude: 2, longitude: 3 },
      ]);
    });

    it('are not filtered if city filter is ""', () => {
      const data = selector(getState({
        units: {
          21: createUnit(21, 0, 1, 'Helsinki'),
          1: createUnit(1, 2, 3, 'Espoo'),
        },
        city: '',
      }));
      expect(data.markers).to.deep.equal([
        { id: '1', latitude: 2, longitude: 3 },
        { id: '21', latitude: 0, longitude: 1 },
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
      maxLatitude: 5,
      minLatitude: 0,
      maxLongitude: 10,
      minLongitude: 3,
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
        units: { 1: createUnit(1, 5, 5, 'Helsinki') },
        city: 'Espoo',
      }));
      expect(data.isLoaded).to.be.true;
    });
  });
});
