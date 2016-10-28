import { expect } from 'chai';

import selector from './postalCodeFilterSelector';

function getState({ units = {}, filter = [], city = '' } = {}) {
  return { data: { units }, filters: { postalCodes: filter, city } };
}

describe('screens/sidebar/postalCodeFilter/postalCodeSelector', () => {
  describe('selectedPostalCodes', () => {
    it('can be empty array', () => {
      const actual = selector(getState());
      expect(actual.selectedPostalCodes).to.deep.equal([]);
    });

    it('selects postalCodes filter', () => {
      const filter = ['00100', '00200'];
      const actual = selector(getState({
        units: {
          1: { addressZip: '00100', city: 'Helsinki' },
          2: { addressZip: '00200', city: 'Helsinki' },
        },
        filter,
      }));
      expect(actual.selectedPostalCodes).to.deep.equal(filter);
    });

    it('ignores values not in selected city', () => {
      const actual = selector(getState({
        units: {
          1: { addressZip: '00100', city: 'Helsinki' },
          2: { addressZip: '00120', city: 'Helsinki' },
          3: { addressZip: '02100', city: 'Espoo' },
        },
        city: 'Helsinki',
        filter: ['00100', '02100'],
      }));
      expect(actual.selectedPostalCodes).to.deep.equal(['00100']);
    });
  });

  describe('postal codes', () => {
    it('can be empty', () => {
      const actual = selector(getState());
      expect(actual.postalCodes).to.deep.equal([]);
    });

    it('are selected', () => {
      const actual = selector(getState({ units: { 1: { addressZip: '00100' } } }));
      expect(actual.postalCodes).to.deep.equal(['00100']);
    });

    it('are filtered by city', () => {
      const actual = selector(getState({
        units: {
          1: { addressZip: '00100', city: 'Helsinki' },
          2: { addressZip: '00120', city: 'Helsinki' },
          3: { addressZip: '02100', city: 'Espoo' },
        },
        city: 'Helsinki',
      }));
      expect(actual.postalCodes).to.deep.equal(['00100', '00120']);
    });

    it('are sorted', () => {
      const actual = selector(getState({
        units: {
          1: { addressZip: '21000' },
          2: { addressZip: '00000' },
          3: { addressZip: '20000' },
          4: { addressZip: '10000' },
        },
      }));
      expect(actual.postalCodes).to.deep.equal([
        '00000',
        '10000',
        '20000',
        '21000',
      ]);
    });

    it('do not have duplicates', () => {
      const actual = selector(getState({
        units: {
          1: { addressZip: '20000' },
          2: { addressZip: '20000' },
          3: { addressZip: '10000' },
          4: { addressZip: '20000' },
        },
      }));
      expect(actual.postalCodes).to.deep.equal([
        '10000',
        '20000',
      ]);
    });
  });
});
