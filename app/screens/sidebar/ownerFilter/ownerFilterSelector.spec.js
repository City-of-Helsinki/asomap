import { expect } from 'chai';

import selector from './ownerFilterSelector';

function getState({ units = {}, filter = [] } = {}) {
  return { data: { units }, filters: { owners: filter } };
}

function createUnit(id, owner) {
  return { id, owner };
}

describe('screens/sidebar/ownerFilter/ownerFilterSelector', () => {
  describe('owners', () => {
    it('has owner from units', () => {
      const actual = selector(getState({
        units: {
          1: createUnit(1, 'Owner A'),
        },
      }));
      expect(actual.owners).to.deep.equal(['Owner A']);
    });

    it('is sorted', () => {
      const actual = selector(getState({
        units: {
          1: createUnit(1, 'Owner A'),
          2: createUnit(2, 'Owner C'),
          3: createUnit(3, 'Owner B'),
          4: createUnit(4, 'Owner D'),
        },
      }));
      expect(actual.owners).to.deep.equal([
        'Owner A',
        'Owner B',
        'Owner C',
        'Owner D',
      ]);
    });

    it('do not include duplicates', () => {
      const actual = selector(getState({
        units: {
          1: createUnit(1, 'Owner A'),
          2: createUnit(2, 'Owner A'),
          3: createUnit(3, 'Owner B'),
          4: createUnit(4, 'Owner A'),
        },
      }));
      expect(actual.owners).to.deep.equal([
        'Owner A',
        'Owner B',
      ]);
    });
  });

  describe('selectedOwners', () => {
    it('selects owner filter', () => {
      const filter = ['Owner A', 'Owner B'];
      const actual = selector(getState({ filter }));
      expect(actual.selectedOwners).to.equal(filter);
    });
  });
});
