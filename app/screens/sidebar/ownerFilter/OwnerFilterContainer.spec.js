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
    const owners = [
      { name: 'A', unitCount: 0 },
      { name: 'B', unitCount: 1 },
      { name: 'C', unitCount: 2 },
    ];
    const select = getWrapper({ owners }).find(Select);
    const options = select.prop('options');
    expect(options).to.have.length(3);
    expect(options[0].label).to.equal('A (0)');
    expect(options[0].value).to.equal('A');
    expect(options[1].label).to.equal('B (1)');
    expect(options[1].value).to.equal('B');
    expect(options[2].label).to.equal('C (2)');
    expect(options[2].value).to.equal('C');
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
