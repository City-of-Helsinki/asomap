import { expect } from 'chai';

import selector from './postalCodeFilterSelector';

function getState({ units = {} } = {}) {
  return { data: { units } };
}

describe('screens/sidebar/postalCodeFilter/postalCodeSelector', () => {
  describe('postal codes', () => {
    it('can be empty', () => {
      const actual = selector(getState());
      expect(actual.postalCodes).to.deep.equal([]);
    });

    it('are selected', () => {
      const actual = selector(getState({ units: { 1: { addressZip: '00100' } } }));
      expect(actual.postalCodes).to.deep.equal(['00100']);
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
