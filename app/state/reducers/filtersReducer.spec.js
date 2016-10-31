import { expect } from 'chai';

import reducer from './filtersReducer';

describe('state/reducers/filtersReducer', () => {
  it('has correct initial state', () => {
    const initial = reducer(undefined, { type: 'NOOP' });
    expect(initial).to.deep.equal({
      city: '',
      owners: [],
      postalCodes: [],
      validPostalCodesByCity: {},
    });
  });

  describe('GET_UNITS_SUCCESS', () => {
    it('populates validPostalCodesByCity', () => {
      const actual = reducer(undefined, {
        type: 'GET_UNITS_SUCCESS',
        payload: {
          1: { addressZip: '00100', city: 'Helsinki' },
          2: { addressZip: '00120', city: 'Helsinki' },
          3: { addressZip: '00100', city: 'Helsinki' },
          4: { addressZip: '02100', city: 'Espoo' },
        },
      });
      expect(actual.validPostalCodesByCity).to.deep.equal({
        Espoo: ['02100'],
        Helsinki: ['00100', '00120'],
      });
    });
  });

  describe('CHANGE_CITY_FILTER', () => {
    it('assigns payload to city', () => {
      const actual = reducer(undefined, {
        type: 'CHANGE_CITY_FILTER',
        payload: 'Hoopaloopa',
      });
      expect(actual.city).to.equal('Hoopaloopa');
    });

    it('can change to empty string', () => {
      const actual = reducer(undefined, {
        type: 'CHANGE_CITY_FILTER',
        payload: '',
      });
      expect(actual.city).to.equal('');
    });

    it('clears postal codes', () => {
      const postalCodes = ['00100', '00120'];
      const actual = reducer({ postalCodes, city: 'Helsinki' }, {
        type: 'CHANGE_CITY_FILTER',
        payload: 'Espoo',
      });
      expect(actual.postalCodes).to.deep.equal([]);
    });

    it('does not clear postal codes if changed to empty', () => {
      const postalCodes = ['00100', '00120'];
      const actual = reducer({ postalCodes, city: 'Helsinki' }, {
        type: 'CHANGE_CITY_FILTER',
        payload: '',
      });
      expect(actual.postalCodes).to.equal(postalCodes);
    });

    it('filters postal codes if changed from empty', () => {
      const postalCodes = ['00100', '02100'];
      const validPostalCodesByCity = {
        Espoo: ['02100', '02200'],
        Helsinki: ['00100'],
      };
      const initial = { postalCodes, validPostalCodesByCity, city: '' };
      const actual = reducer(initial, {
        type: 'CHANGE_CITY_FILTER',
        payload: 'Espoo',
      });
      expect(actual.postalCodes).to.deep.equal(['02100']);
    });
  });

  describe('CHANGE_OWNER_FILTER', () => {
    it('assigns payload to owner', () => {
      const payload = ['Owner A', 'Owner B'];
      const actual = reducer(undefined, {
        type: 'CHANGE_OWNER_FILTER',
        payload,
      });
      expect(actual.owners).to.equal(payload);
    });

    it('can change to empty array', () => {
      const payload = [];
      const actual = reducer(undefined, {
        type: 'CHANGE_OWNER_FILTER',
        payload,
      });
      expect(actual.owners).to.equal(payload);
    });
  });

  describe('CHANGE_POSTAL_CODE_FILTER', () => {
    it('assigns payload to postalCode', () => {
      const payload = ['00100', '00180'];
      const actual = reducer(undefined, {
        type: 'CHANGE_POSTAL_CODE_FILTER',
        payload,
      });
      expect(actual.postalCodes).to.equal(payload);
    });

    it('can change to empty array', () => {
      const payload = [];
      const actual = reducer(undefined, {
        type: 'CHANGE_POSTAL_CODE_FILTER',
        payload,
      });
      expect(actual.postalCodes).to.equal(payload);
    });
  });
});
