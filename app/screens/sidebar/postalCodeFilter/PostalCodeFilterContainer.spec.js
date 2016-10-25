import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import { UnconnectedPostalCodeFilterContainer as PostalCodeFilterContainer } from './PostalCodeFilterContainer';

function getWrapper(props) {
  const defaults = {
    onSelect: () => null,
    postalCodes: [],
    selectedPostalCodes: [],
  };
  return shallow(<PostalCodeFilterContainer {...defaults} {...props} />);
}

describe('screens/sidebar/postalCodeFilter/PostalCodeFilterContainer', () => {
  function testOption(option, value) {
    expect(option.prop('value')).to.equal(value);
    expect(option.text()).to.equal(value);
  }

  it('renders no options if none given', () => {
    const options = getWrapper().find('option');
    expect(options).to.have.length(0);
  });

  it('renders given options', () => {
    const options = getWrapper({ postalCodes: ['00100', '00180'] }).find('option');
    expect(options).to.have.length(2);
    testOption(options.at(0), '00100');
    testOption(options.at(1), '00180');
  });

  it('selects selected values', () => {
    const selectedPostalCodes = ['00100', '00200'];
    const select = getWrapper({ selectedPostalCodes }).find('select');
    expect(select.prop('value')).to.equal(selectedPostalCodes);
  });

  it('binds onSelect to select.onChange', () => {
    const onSelect = () => null;
    const select = getWrapper({ onSelect }).find('select');
    expect(select.prop('onChange')).to.equal(onSelect);
  });
});
