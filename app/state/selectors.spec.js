import { expect } from 'chai';

import selectors from './selectors';

function getState(extra) {
  const units = extra.units || {};
  const filters = extra.filters || {};
  const city = filters.city || '';
  const owners = filters.owners || [];
  const postalCodes = filters.postalCodes || [];
  return {
    data: { units },
    filters: { city, owners, postalCodes },
  };
}

function createUnit(extra) {
  const defaults = {
    city: 'Helsinki',
    coordinates: { longitude: 1, latitude: 2 },
    id: '1',
    name: 'Unit name',
    owner: 'Unit owner',
    streetAddress: 'Unit address',
    url: 'http://www.example.com',
  };
  return Object.assign(defaults, extra);
}

describe('state/selectors', () => {
  describe('unitsSelector', () => {
    it('returns units', () => {
      const units = { 3: 1, 4: 0 };
      const actual = selectors.unitsSelector(getState({ units }));
      expect(actual).to.equal(units);
    });
  });

  describe('cityFilterSelector', () => {
    it('returns city filter', () => {
      const city = { some: 'test object' };
      const actual = selectors.cityFilterSelector(getState({ filters: { city } }));
      expect(actual).to.equal(city);
    });
  });

  describe('ownerFilterSelector', () => {
    it('returns owner filter', () => {
      const owners = [1, 2, 3];
      const actual = selectors.ownerFilterSelector(getState({ filters: { owners } }));
      expect(actual).to.equal(owners);
    });
  });

  describe('postalCodeFilterSelector', () => {
    it('returns postal code filter', () => {
      const postalCodes = [1, 2, 3, 4];
      const actual = selectors.postalCodeFilterSelector(getState({ filters: { postalCodes } }));
      expect(actual).to.equal(postalCodes);
    });
  });

  describe('unitsListSelector', () => {
    it('returns unit values', () => {
      const units = { 1: 'a', 2: 'b', 3: 'c' };
      const actual = selectors.unitsListSelector(getState({ units }));
      expect(actual.sort()).to.deep.equal(['a', 'b', 'c']);
    });

    it('returns empty list if no units', () => {
      const units = {};
      const actual = selectors.unitsListSelector(getState({ units }));
      expect(actual).to.deep.equal([]);
    });
  });

  describe('isLoadedSelector', () => {
    it('returns true if units exist', () => {
      const units = { 1: 'a' };
      const actual = selectors.isLoadedSelector(getState({ units }));
      expect(actual).to.be.true;
    });

    it('returns false if units do not exist', () => {
      const units = {};
      const actual = selectors.isLoadedSelector(getState({ units }));
      expect(actual).to.be.false;
    });
  });

  describe('cityUnitsSelector', () => {
    it('returns empty list if no units', () => {
      const units = {};
      const city = 'Helsinki';
      const actual = selectors.cityUnitsSelector(getState({ units, filters: { city } }));
      expect(actual).to.deep.equal([]);
    });

    it('returns empty list if no units in city', () => {
      const units = { 1: createUnit({ city: 'Espoo' }) };
      const city = 'Helsinki';
      const actual = selectors.cityUnitsSelector(getState({ units, filters: { city } }));
      expect(actual).to.deep.equal([]);
    });

    it('returns units in city', () => {
      const unit = createUnit({ city: 'Helsinki' });
      const units = { 1: unit, 2: createUnit({ id: '2', city: 'Espoo' }) };
      const city = 'Helsinki';
      const actual = selectors.cityUnitsSelector(getState({ units, filters: { city } }));
      expect(actual).to.deep.equal([unit]);
    });
  });

  describe('cityUnitPostalCodesSelector', () => {
    it('returns empty list if no units', () => {
      const units = {};
      const city = 'Helsinki';
      const actual = selectors.cityUnitPostalCodesSelector(getState({ units, filters: { city } }));
      expect(actual).to.deep.equal([]);
    });

    it('returns empty list if no units in city', () => {
      const units = { 1: createUnit({ city: 'Espoo' }) };
      const city = 'Helsinki';
      const actual = selectors.cityUnitPostalCodesSelector(getState({ units, filters: { city } }));
      expect(actual).to.deep.equal([]);
    });

    it('returns postal codes in city', () => {
      const units = {
        1: createUnit({ city: 'Helsinki', addressZip: '00100' }),
        2: createUnit({ id: '2', city: 'Espoo', addressZip: '02100' }),
        3: createUnit({ id: '3', city: 'Helsinki', addressZip: '00120' }),
      };
      const city = 'Helsinki';
      const actual = selectors.cityUnitPostalCodesSelector(getState({ units, filters: { city } }));
      expect(actual).to.deep.equal(['00100', '00120']);
    });

    it('does not include duplicates and is sorted', () => {
      const units = {
        1: createUnit({ city: 'Helsinki', addressZip: '00100' }),
        2: createUnit({ id: '2', city: 'Helsinki', addressZip: '00120' }),
        3: createUnit({ id: '3', city: 'Helsinki', addressZip: '00110' }),
        4: createUnit({ id: '4', city: 'Helsinki', addressZip: '00100' }),
      };
      const city = 'Helsinki';
      const actual = selectors.cityUnitPostalCodesSelector(getState({ units, filters: { city } }));
      expect(actual).to.deep.equal(['00100', '00110', '00120']);
    });
  });
});
