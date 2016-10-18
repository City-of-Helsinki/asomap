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
      url: 'http://owner.example.com',
    };
    return shallow(<PopupContainer {...defaults} {...props} />);
  }

  it('renders a Leaflet Popup', () => {
    const popup = getWrapper().find(Popup);
    expect(popup).to.have.length(1);
  });

  it('renders owner', () => {
    const owner = getWrapper().find('.owner');
    expect(owner).to.have.length(1);
    expect(owner.text()).to.equal('Omistaja: Unit owner');
  });

  it('renders name', () => {
    const name = getWrapper().find('.name');
    expect(name).to.have.length(1);
    expect(name.text()).to.equal('Nimi: Unit name');
  });

  it('renders streetAddress', () => {
    const streetAddress = getWrapper().find('.streetAddress');
    expect(streetAddress).to.have.length(1);
    expect(streetAddress.text()).to.equal('Osoite: Unit address');
  });

  it('renders addressZip', () => {
    const addressZip = getWrapper().find('.addressZip');
    expect(addressZip).to.have.length(1);
    expect(addressZip.text()).to.equal('Postinumero: 00100');
  });

  it('renders city', () => {
    const city = getWrapper().find('.city');
    expect(city).to.have.length(1);
    expect(city.text()).to.equal('Kaupunki: Helsinki');
  });

  it('renders url', () => {
    const url = getWrapper().find('.url');
    expect(url).to.have.length(1);
    const link = url.find('a');
    expect(link).to.have.length(1);
    expect(link.prop('href')).to.equal('http://owner.example.com');
    expect(url.text()).to.equal('WWW-sivu');
  });
});
