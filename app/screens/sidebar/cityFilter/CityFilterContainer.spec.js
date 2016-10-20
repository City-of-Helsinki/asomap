import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import { UnconnectedCityFilterContainer as CityFilterContainer } from './CityFilterContainer';

function getWrapper(props) {
  const defaults = {
    cities: ['Espoo', 'Helsinki', 'Vantaa'],
    onSelect: () => null,
    selected: '',
  };
  return shallow(<CityFilterContainer {...defaults} {...props} />);
}

function getOptions(props) {
  const wrapper = getWrapper(props);
  return wrapper.find('option');
}

describe('screens/sidebar/cityFilter/CityFilterContainer', () => {
  function testOption(option, name, value) {
    expect(option.text()).to.equal(name);
    expect(option.prop('value')).to.equal(value);
  }

  it('selects empty value by default', () => {
    const wrapper = getWrapper();
    expect(wrapper.prop('value')).to.equal('');
  });

  it('selects given value', () => {
    const wrapper = getWrapper({ selected: 'Hoopaloopa' });
    expect(wrapper.prop('value')).to.equal('Hoopaloopa');
  });

  it('binds given onSelect to select.onChange', () => {
    const onSelect = () => null;
    const wrapper = getWrapper({ onSelect });
    expect(wrapper.prop('onChange')).to.equal(onSelect);
  });

  it('renders only all cities option if no cities', () => {
    const options = getOptions({ cities: [] });
    expect(options).to.have.length(1);
    testOption(options.at(0), 'Kaikki kaupungit', '');
  });

  it('renders given cities', () => {
    const options = getOptions();
    expect(options).to.have.length(4);
    testOption(options.at(0), 'Kaikki kaupungit', '');
    testOption(options.at(1), 'Espoo', 'Espoo');
    testOption(options.at(2), 'Helsinki', 'Helsinki');
    testOption(options.at(3), 'Vantaa', 'Vantaa');
  });
});
