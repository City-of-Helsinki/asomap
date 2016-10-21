import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import CityFilter from './cityFilter';
import PostalCodeFilter from './postalCodeFilter';
import { UnconnectedSidebarContainer as SidebarContainer } from './SidebarContainer';

describe('screens/sidebar/SidebarContainer', () => {
  function getWrapper(props) {
    const defaults = { isLoaded: true };
    return shallow(<SidebarContainer {...defaults} {...props} />);
  }

  it('renders CityFilter', () => {
    const cityFilter = getWrapper().find(CityFilter);
    expect(cityFilter).to.have.length(1);
  });

  it('renders PostalCodeFilter', () => {
    const postalCodeFilter = getWrapper().find(PostalCodeFilter);
    expect(postalCodeFilter).to.have.length(1);
  });

  describe('when not loaded', () => {
    it('renders empty div', () => {
      const wrapper = getWrapper({ isLoaded: false });
      expect(wrapper.equals(<div />)).to.be.true;
    });
  });
});
