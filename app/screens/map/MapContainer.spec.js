import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Map } from 'react-leaflet';

import { UnconnectedMapContainer as MapContainer } from './MapContainer';

describe('screens/map/MapContainer', () => {
  function getWrapper(props) {
    const defaults = {};
    return shallow(<MapContainer {...defaults} {...props} />);
  }

  it('renders a leaflet Map', () => {
    const map = getWrapper().find(Map);
    expect(map).to.have.length(1);
  });
});
