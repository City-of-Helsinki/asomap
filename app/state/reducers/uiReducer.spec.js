import { expect } from 'chai';
import simple from 'simple-mock';

import uiActions from 'actions/uiActions';
import reducer from './uiReducer';

function getSidebarState(extra) {
  return {
    sidebar: Object.assign({ collapsed: true }, extra),
  };
}

describe('state/reducers/uiReducer', () => {
  function createTests({ isMobile }) {
    it('returns initial state', () => {
      const actual = reducer(undefined, { type: 'NOOP' });
      expect(actual).to.deep.equal({ sidebar: { collapsed: isMobile } });
    });

    describe('TOGGLE_SIDEBAR', () => {
      it('toggles from true to false', () => {
        const actual = reducer(getSidebarState({ collapsed: true }), { type: 'TOGGLE_SIDEBAR' });
        expect(actual.sidebar).to.deep.equal({ collapsed: false });
      });

      it('toggles from false to true', () => {
        const actual = reducer(getSidebarState({ collapsed: false }), { type: 'TOGGLE_SIDEBAR' });
        expect(actual.sidebar).to.deep.equal({ collapsed: true });
      });
    });

    const testName = isMobile ? 'hides sidebar' : 'does not hide sidebar';

    describe('CHANGE_CITY_FILTER', () => {
      it(testName, () => {
        const actual = reducer(getSidebarState({ collapsed: false }), uiActions.changeCityFilter('Espoo'));
        expect(actual.sidebar).to.deep.equal({ collapsed: isMobile });
      });
    });

    describe('CHANGE_POSTAL_CODE_FILTER', () => {
      it(testName, () => {
        const initial = getSidebarState({ collapsed: false });
        const actual = reducer(initial, uiActions.changePostalCodeFilter([]));
        expect(actual.sidebar).to.deep.equal({ collapsed: isMobile });
      });
    });

    describe('CHANGE_OWNER_FILTER', () => {
      it(testName, () => {
        const initial = getSidebarState({ collapsed: false });
        const actual = reducer(initial, uiActions.changeOwnerFilter([]));
        expect(actual.sidebar).to.deep.equal({ collapsed: isMobile });
      });
    });
  }

  describe('on mobile', () => {
    before(() => {
      simple.mock(window, 'innerWidth', 768);
    });

    after(() => {
      simple.restore();
    });

    createTests({ isMobile: true });
  });

  describe('on desktop', () => {
    before(() => {
      simple.mock(window, 'innerWidth', 769);
    });

    after(() => {
      simple.restore();
    });

    createTests({ isMobile: false });
  });
});
