import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import CityFilter from './cityFilter';
import OwnerFilter from './ownerFilter';
import PostalCodeFilter from './postalCodeFilter';
import { UnconnectedSidebarContainer as SidebarContainer } from './SidebarContainer';

describe('screens/sidebar/SidebarContainer', () => {
  function getWrapper(props) {
    const defaults = { isCollapsed: false, isLoaded: true, onHeaderClick: () => null };
    return shallow(<SidebarContainer {...defaults} {...props} />);
  }

  it('has .sidebar-collapsed if collapsed', () => {
    const wrapper = getWrapper({ isCollapsed: true });
    expect(wrapper.hasClass('sidebar-collapsed')).to.be.true;
  });

  it('does not have .sidebar-collapsed if not collapsed', () => {
    const wrapper = getWrapper({ isCollapsed: false });
    expect(wrapper.hasClass('sidebar-collapsed')).to.be.false;
  });

  it('renders CityFilter', () => {
    const cityFilter = getWrapper().find(CityFilter);
    expect(cityFilter).to.have.length(1);
  });

  it('renders OwnerFilter', () => {
    const ownerFilter = getWrapper().find(OwnerFilter);
    expect(ownerFilter).to.have.length(1);
  });

  it('renders PostalCodeFilter', () => {
    const postalCodeFilter = getWrapper().find(PostalCodeFilter);
    expect(postalCodeFilter).to.have.length(1);
  });

  it('binds onHeaderClick to header-link.onClick', () => {
    const onHeaderClick = () => null;
    const headerLink = getWrapper({ onHeaderClick }).find('.header-link');
    expect(headerLink.prop('onClick')).to.equal(onHeaderClick);
  });

  describe('when not loaded', () => {
    it('renders empty div', () => {
      const wrapper = getWrapper({ isLoaded: false });
      expect(wrapper.equals(<div />)).to.be.true;
    });
  });
});
