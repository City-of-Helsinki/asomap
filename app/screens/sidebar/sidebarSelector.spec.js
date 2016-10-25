import { expect } from 'chai';

import selector from './sidebarSelector';

function getState({ units = {}, sidebar = { collapsed: true } }) {
  return {
    data: { units },
    ui: { sidebar },
  };
}

describe('screens/sidebar/sidebarSelector', () => {
  describe('isCollapsed', () => {
    it('is true if true in state', () => {
      const actual = selector(getState({ sidebar: { collapsed: true } }));
      expect(actual.isCollapsed).to.be.true;
    });

    it('is false if false in state', () => {
      const actual = selector(getState({ sidebar: { collapsed: false } }));
      expect(actual.isCollapsed).to.be.false;
    });
  });

  describe('isLoaded', () => {
    it('is true if units exist', () => {
      const actual = selector(getState({ units: { 1: 1 } }));
      expect(actual.isLoaded).to.be.true;
    });

    it('is false if units do not exist', () => {
      const actual = selector(getState({ units: {} }));
      expect(actual.isLoaded).to.be.false;
    });
  });
});
