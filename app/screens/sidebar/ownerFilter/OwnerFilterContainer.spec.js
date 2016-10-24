import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import { UnconnectedOwnerFilterContainer as OwnerFilterContainer } from './OwnerFilterContainer';

function getWrapper(props) {
  const defaults = {
    owners: [],
  };
  return shallow(<OwnerFilterContainer {...defaults} {...props} />);
}

function testOption(option, value) {
  expect(option.prop('value')).to.equal(value);
  expect(option.text()).to.equal(value);
}

describe('screens/sidebar/ownerFilter/OwnerFilterContainer', () => {
  it('renders no options if none given', () => {
    const owners = getWrapper().find('option');
    expect(owners).to.have.length(0);
  });

  it('renders option for owners', () => {
    const owners = getWrapper({ owners: ['A', 'B', 'C'] }).find('option');
    expect(owners).to.have.length(3);
    testOption(owners.at(0), 'A');
    testOption(owners.at(1), 'B');
    testOption(owners.at(2), 'C');
  });
});
