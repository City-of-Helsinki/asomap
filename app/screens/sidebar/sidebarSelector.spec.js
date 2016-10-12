import { expect } from 'chai';

import sidebarSelector from './sidebarSelector';

describe('screens/sidebar/sidebarSelector', () => {
  const message = 'Some message';
  const state = {
    example: { message },
  };
  const selected = sidebarSelector(state);

  it('returns message from state', () => {
    expect(selected.message).to.equal(message);
  });
});
