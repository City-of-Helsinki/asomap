import { expect } from 'chai';

import reducer from './filtersReducer';

describe('state/reducers/filtersReducer', () => {
  it('has correct initial state', () => {
    const initial = reducer(undefined, { type: 'NOOP' });
    expect(initial).to.deep.equal({
      city: '',
    });
  });

  describe('CHANGE_CITY_FILTER', () => {
    it('assigns payload to city', () => {
      const actual = reducer(null, {
        type: 'CHANGE_CITY_FILTER',
        payload: 'Hoopaloopa',
      });
      expect(actual.city).to.equal('Hoopaloopa');
    });

    it('can change to empty string', () => {
      const actual = reducer(null, {
        type: 'CHANGE_CITY_FILTER',
        payload: '',
      });
      expect(actual.city).to.equal('');
    });
  });
});
