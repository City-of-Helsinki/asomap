import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import { UnconnectedCityFilterContainer as CityFilterContainer } from './CityFilterContainer';

function getWrapper(props) {
  const defaults = {
    cities: [
      { name: 'Espoo', unitCount: 0 },
      { name: 'Helsinki', unitCount: 1 },
      { name: 'Vantaa', unitCount: 2 },
    ],
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
    const select = getWrapper().find('select');
    expect(select.prop('value')).to.equal('');
  });

  it('selects given value', () => {
    const select = getWrapper({ selected: 'Hoopaloopa' }).find('select');
    expect(select.prop('value')).to.equal('Hoopaloopa');
  });

  it('binds given onSelect to select.onChange', () => {
    const onSelect = () => null;
    const select = getWrapper({ onSelect }).find('select');
    expect(select.prop('onChange')).to.equal(onSelect);
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
    testOption(options.at(1), 'Espoo (0)', 'Espoo');
    testOption(options.at(2), 'Helsinki (1)', 'Helsinki');
    testOption(options.at(3), 'Vantaa (2)', 'Vantaa');
  });
});
