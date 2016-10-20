import { expect } from 'chai';

import selector from './cityFilterSelector';

function getState({ units = {}, city = '' }) {
  return { data: { units }, filters: { city } };
}

describe('screens/sidebar/cityFilter/cityFilterSelector', () => {
  describe('cities', () => {
    it('are selected', () => {
      const actual = selector(getState({ units: { 1: { city: 'Helsinki' } } }));
      expect(actual.cities).to.deep.equal(['Helsinki']);
    });

    it('are selected in alphabetical order', () => {
      const actual = selector(getState({
        units: {
          1: { city: 'Espoo' },
          2: { city: 'Vantaa' },
          3: { city: 'Helsinki' },
        },
      }));
      expect(actual.cities).to.deep.equal(['Espoo', 'Helsinki', 'Vantaa']);
    });

    it('do not contain duplicates', () => {
      const actual = selector(getState({
        units: {
          1: { city: 'Espoo' },
          2: { city: 'Espoo' },
          3: { city: 'Helsinki' },
          4: { city: 'Espoo' },
        },
      }));
      expect(actual.cities).to.deep.equal(['Espoo', 'Helsinki']);
    });
  });

  describe('selcted', () => {
    it('equals city filter', () => {
      const actual = selector(getState({ city: 'Hoopaloopa' }));
      expect(actual.selected).to.equal('Hoopaloopa');
    });
  });
});
