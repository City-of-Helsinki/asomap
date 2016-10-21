import { expect } from 'chai';

import reducer from './filtersReducer';

describe('state/reducers/filtersReducer', () => {
  it('has correct initial state', () => {
    const initial = reducer(undefined, { type: 'NOOP' });
    expect(initial).to.deep.equal({
      city: '',
      postalCodes: [],
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

  describe('CHANGE_POSTAL_CODE_FILTER', () => {
    it('assigns payload to postalCode', () => {
      const payload = ['00100', '00180'];
      const actual = reducer(null, {
        type: 'CHANGE_POSTAL_CODE_FILTER',
        payload,
      });
      expect(actual.postalCodes).to.equal(payload);
    });

    it('can change to empty array', () => {
      const payload = [];
      const actual = reducer(null, {
        type: 'CHANGE_POSTAL_CODE_FILTER',
        payload,
      });
      expect(actual.postalCodes).to.equal(payload);
    });
  });
});
