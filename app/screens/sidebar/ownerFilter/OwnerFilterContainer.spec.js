import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Select from 'screens/sidebar/Select';
import { UnconnectedOwnerFilterContainer as OwnerFilterContainer } from './OwnerFilterContainer';

function getWrapper(props) {
  const defaults = {
    onSelect: () => null,
    owners: [],
    selectedOwners: [],
  };
  return shallow(<OwnerFilterContainer {...defaults} {...props} />);
}

describe('screens/sidebar/ownerFilter/OwnerFilterContainer', () => {
  it('renders no options if none given', () => {
    const select = getWrapper().find(Select);
    expect(select.prop('options')).to.deep.equal([]);
  });

  it('renders option for owners', () => {
    const select = getWrapper({ owners: ['A', 'B', 'C'] }).find(Select);
    expect(select.prop('options')).to.deep.equal([
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
    ]);
  });

  it('binds onSelect to Select.onChange', () => {
    const onSelect = () => null;
    const select = getWrapper({ onSelect }).find(Select);
    expect(select.prop('onChange')).to.equal(onSelect);
  });

  it('uses selectedOwners as the select value', () => {
    const selectedOwners = ['A', 'B', 'C'];
    const select = getWrapper({ selectedOwners }).find(Select);
    expect(select.prop('value')).to.equal(selectedOwners);
  });
});
