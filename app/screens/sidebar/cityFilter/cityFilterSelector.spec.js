import { expect } from 'chai';

import selector from './cityFilterSelector';

function getState(units) {
  return { data: { units } };
}

describe('screens/sidebar/cityFilter/cityFilterSelector', () => {
  describe('cities', () => {
    it('are selected', () => {
      const actual = selector(getState({ 1: { city: 'Helsinki' } }));
      expect(actual.cities).to.deep.equal(['Helsinki']);
    });

    it('are selected in alphabetical order', () => {
      const actual = selector(getState({
        1: { city: 'Espoo' },
        2: { city: 'Vantaa' },
        3: { city: 'Helsinki' },
      }));
      expect(actual.cities).to.deep.equal(['Espoo', 'Helsinki', 'Vantaa']);
    });

    it('do not contain duplicates', () => {
      const actual = selector(getState({
        1: { city: 'Espoo' },
        2: { city: 'Espoo' },
        3: { city: 'Helsinki' },
        4: { city: 'Espoo' },
      }));
      expect(actual.cities).to.deep.equal(['Espoo', 'Helsinki']);
    });
  });
});
