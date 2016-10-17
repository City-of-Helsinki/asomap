import { expect } from 'chai';

import selector from './mapSelector';

function getState(units) {
  return { data: { units } };
}

describe('screens/map/mapSelctor', () => {
  it('returns markers', () => {
    const data = selector(getState({
      21: {
        id: 21,
        coordinates: {
          latitude: 0,
          longitude: 1,
        },
      },
      1: {
        id: 1,
        coordinates: {
          latitude: 2,
          longitude: 3,
        },
      },
    }));
    expect(data.markers).to.deep.equal([
      { id: 1, latitude: 2, longitude: 3 },
      { id: 21, latitude: 0, longitude: 1 },
    ]);
  });
});
