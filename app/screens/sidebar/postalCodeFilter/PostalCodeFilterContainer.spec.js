import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Select from 'screens/sidebar/Select';
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
  it('renders a Select with no options if none given', () => {
    const select = getWrapper().find(Select);
    expect(select).to.have.length(1);
    expect(select.prop('options')).to.deep.equal([]);
  });

  it('renders given options for Select', () => {
    const select = getWrapper({ postalCodes: ['00100', '00180'] }).find(Select);
    expect(select.prop('options')).to.deep.equal([
      { label: '00100', value: '00100' },
      { label: '00180', value: '00180' },
    ]);
  });

  it('selects selected values in Select', () => {
    const selectedPostalCodes = ['00100', '00200'];
    const select = getWrapper({ selectedPostalCodes }).find(Select);
    expect(select.prop('value')).to.equal(selectedPostalCodes);
  });

  it('binds onSelect to Select.onChange', () => {
    const onSelect = () => null;
    const select = getWrapper({ onSelect }).find(Select);
    expect(select.prop('onChange')).to.equal(onSelect);
  });
});
