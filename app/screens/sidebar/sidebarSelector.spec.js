import { expect } from 'chai';

import selector from './sidebarSelector';

describe('screens/sidebar/sidebarSelector', () => {
  describe('isLoaded', () => {
    it('is true if units exist', () => {
      const actual = selector({ data: { units: { 1: 1 } } });
      expect(actual.isLoaded).to.be.true;
    });

    it('is false if units do not exist', () => {
      const actual = selector({ data: { units: {} } });
      expect(actual.isLoaded).to.be.false;
    });
  });
});
