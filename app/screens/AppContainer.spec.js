import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import simple from 'simple-mock';

import App from './App';
import { UnconnectedAppContainer as AppContainer } from './AppContainer';

function getWrapper(props) {
  const defaults = { getUnits() {} };
  return shallow(<AppContainer {...defaults} {...props} />);
}

describe('screens/AppContainer', () => {
  it('renders App', () => {
    const app = getWrapper().find(App);
    expect(app).to.have.length(1);
  });

  describe('componentWillMount', () => {
    it('calls getUnits', () => {
      const getUnits = simple.mock();
      const wrapper = getWrapper({ getUnits });
      expect(getUnits.callCount).to.equal(1);
      getUnits.reset();
      wrapper.instance().componentWillMount();
      expect(getUnits.callCount).to.equal(1);
    });
  });
});
