import { expect } from 'chai';

import reducer from './uiReducer';

function getSidebarState(extra) {
  return {
    sidebar: Object.assign({ collapsed: true }, extra),
  };
}

describe('state/reducers/uiReducer', () => {
  it('returns initial state', () => {
    const actual = reducer(undefined, { type: 'NOOP' });
    expect(actual).to.deep.equal({
      sidebar: {
        collapsed: true,
      },
    });
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
});
