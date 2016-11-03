import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Popup } from 'react-leaflet';

import { UnconnectedPopupContainer as PopupContainer } from './PopupContainer';

describe('screens/map/popup/PopupContainer', () => {
  function getWrapper(props) {
    const defaults = {
      addressZip: '00100',
      city: 'Helsinki',
      name: 'Unit name',
      owner: 'Unit owner',
      streetAddress: 'Unit address',
      url: 'http://owner.example.com/',
    };
    return shallow(<PopupContainer {...defaults} {...props} />);
  }

  it('renders a Leaflet Popup', () => {
    const popup = getWrapper().find(Popup);
    expect(popup).to.have.length(1);
  });

  it('renders owner', () => {
    const owner = getWrapper().find('.popup-owner');
    expect(owner).to.have.length(1);
    expect(owner.text()).to.equal('Unit owner');
  });

  it('renders name', () => {
    const name = getWrapper().find('.popup-name');
    expect(name).to.have.length(1);
    expect(name.text()).to.equal('Unit name');
  });

  it('renders streetAddress', () => {
    const streetAddress = getWrapper().find('.popup-street-address');
    expect(streetAddress).to.have.length(1);
    expect(streetAddress.text()).to.equal('Unit address');
  });

  it('renders addressZip', () => {
    const addressZip = getWrapper().find('.popup-postal-code');
    expect(addressZip).to.have.length(1);
    expect(addressZip.text()).to.equal('00100');
  });

  it('renders city', () => {
    const city = getWrapper().find('.popup-city');
    expect(city).to.have.length(1);
    expect(city.text()).to.equal('Helsinki');
  });

  it('renders url', () => {
    const url = getWrapper().find('.popup-url');
    expect(url).to.have.length(1);
    const link = url.find('a');
    expect(link).to.have.length(1);
    expect(link.prop('href')).to.equal('http://owner.example.com/');
    expect(url.text()).to.equal('owner.example.com');
  });

  it('renders url with path', () => {
    const url = getWrapper({ url: 'https://example.com/path/' }).find('.popup-url');
    const link = url.find('a');
    expect(link.prop('href')).to.equal('https://example.com/path/');
    expect(url.text()).to.equal('example.com/path/');
  });
});
