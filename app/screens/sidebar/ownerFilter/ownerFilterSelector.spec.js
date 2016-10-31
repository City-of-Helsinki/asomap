import { expect } from 'chai';

import selector from './ownerFilterSelector';

function getState({ units = {}, owners = [], city = '', postalCodes = [] } = {}) {
  return { data: { units }, filters: { owners, city, postalCodes } };
}

function createUnit(id, owner, { city = 'Helsinki', addressZip = '00100' } = {}) {
  return { id, owner, city, addressZip };
}

describe('screens/sidebar/ownerFilter/ownerFilterSelector', () => {
  describe('owners', () => {
    it('has owner from units', () => {
      const actual = selector(getState({
        units: {
          1: createUnit(1, 'Owner A'),
        },
      }));
      expect(actual.owners).to.deep.equal([
        { name: 'Owner A', unitCount: 1 },
      ]);
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
        { name: 'Owner A', unitCount: 1 },
        { name: 'Owner B', unitCount: 1 },
        { name: 'Owner C', unitCount: 1 },
        { name: 'Owner D', unitCount: 1 },
      ]);
    });

    it('calculates unit counts', () => {
      const actual = selector(getState({
        units: {
          1: createUnit(1, 'Owner A'),
          2: createUnit(2, 'Owner A'),
          3: createUnit(3, 'Owner B'),
          4: createUnit(4, 'Owner A'),
        },
      }));
      expect(actual.owners).to.deep.equal([
        { name: 'Owner A', unitCount: 3 },
        { name: 'Owner B', unitCount: 1 },
      ]);
    });

    it('only calculates units matching filters', () => {
      const actual = selector(getState({
        units: {
          1: createUnit(1, 'Owner A', { city: 'Helsinki', addressZip: '00100' }),
          2: createUnit(2, 'Owner A', { city: 'Helsinki', addressZip: '00120' }),
          3: createUnit(3, 'Owner B', { city: 'Helsinki', addressZip: '00100' }),
          4: createUnit(4, 'Owner A', { city: 'Espoo', addressZip: '02100' }),
        },
        city: 'Helsinki',
        postalCodes: ['02100', '00100'],
      }));
      expect(actual.owners).to.deep.equal([
        { name: 'Owner A', unitCount: 1 },
        { name: 'Owner B', unitCount: 1 },
      ]);
    });
  });

  describe('selectedOwners', () => {
    it('selects owner filter', () => {
      const owners = ['Owner A', 'Owner B'];
      const actual = selector(getState({ owners }));
      expect(actual.selectedOwners).to.equal(owners);
    });
  });
});
