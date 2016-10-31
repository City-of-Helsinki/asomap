import { expect } from 'chai';

import selector from './cityFilterSelector';

function getState({ units = {}, city = '', owners = [], postalCodes = [] }) {
  return { data: { units }, filters: { city, owners, postalCodes } };
}

describe('screens/sidebar/cityFilter/cityFilterSelector', () => {
  describe('cities', () => {
    it('are selected', () => {
      const actual = selector(getState({ units: { 1: { city: 'Helsinki' } } }));
      expect(actual.cities).to.deep.equal([{ name: 'Helsinki', unitCount: 1 }]);
    });

    it('are selected in alphabetical order', () => {
      const actual = selector(getState({
        units: {
          1: { city: 'Espoo' },
          2: { city: 'Vantaa' },
          3: { city: 'Helsinki' },
        },
      }));
      expect(actual.cities).to.deep.equal([
        { name: 'Espoo', unitCount: 1 },
        { name: 'Helsinki', unitCount: 1 },
        { name: 'Vantaa', unitCount: 1 },
      ]);
    });

    it('counts units', () => {
      const actual = selector(getState({
        units: {
          1: { city: 'Espoo' },
          2: { city: 'Espoo' },
          3: { city: 'Helsinki' },
          4: { city: 'Espoo' },
        },
      }));
      expect(actual.cities).to.deep.equal([
        { name: 'Espoo', unitCount: 3 },
        { name: 'Helsinki', unitCount: 1 },
      ]);
    });

    it('only counts units matching other filters', () => {
      const actual = selector(getState({
        units: {
          1: { city: 'Espoo', owner: 'A', addressZip: '02100' },
          2: { city: 'Espoo', owner: 'B', addressZip: '02100' },
          3: { city: 'Helsinki', owner: 'A', addressZip: '00100' },
          4: { city: 'Espoo', owner: 'A', addressZip: '02200' },
        },
        owners: ['A'],
        postalCodes: ['00100', '02100'],
      }));
      expect(actual.cities).to.deep.equal([
        { name: 'Espoo', unitCount: 1 },
        { name: 'Helsinki', unitCount: 1 },
      ]);
    });
  });

  describe('selcted', () => {
    it('equals city filter', () => {
      const actual = selector(getState({ city: 'Hoopaloopa' }));
      expect(actual.selected).to.equal('Hoopaloopa');
    });
  });
});
