import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Map, Marker } from 'react-leaflet';

import { UnconnectedMapContainer as MapContainer } from './MapContainer';

describe('screens/map/MapContainer', () => {
  function getWrapper(props) {
    const defaults = { markers: [] };
    return shallow(<MapContainer {...defaults} {...props} />);
  }

  it('renders a leaflet Map', () => {
    const map = getWrapper().find(Map);
    expect(map).to.have.length(1);
  });

  describe('markers', () => {
    it('are not rendered if none exist', () => {
      const markers = getWrapper().find(Marker);
      expect(markers).to.have.length(0);
    });

    it('are rendered at correct positions', () => {
      const positions = [
        { id: '1', latitude: 0, longitude: 1 },
        { id: '2', latitude: 2, longitude: 3 },
        { id: '3', latitude: 4, longitude: 5 },
      ];
      const markers = getWrapper({ markers: positions }).find(Marker);
      expect(markers).to.have.length(3);
      expect(markers.at(0).prop('position')).to.deep.equal([0, 1]);
      expect(markers.at(1).prop('position')).to.deep.equal([2, 3]);
      expect(markers.at(2).prop('position')).to.deep.equal([4, 5]);
    });
  });
});
