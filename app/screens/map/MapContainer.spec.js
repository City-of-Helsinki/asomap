import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Map, Marker } from 'react-leaflet';
import simple from 'simple-mock';

import { UnconnectedMapContainer as MapContainer } from './MapContainer';
import Popup from './popup';

describe('screens/map/MapContainer', () => {
  function getWrapper(props) {
    const defaults = {
      isLoaded: true,
      markers: [],
      boundaries: {
        maxLatitude: 0,
        minLatitude: 0,
        maxLongitude: 0,
        minLongitude: 0,
      },
    };
    return shallow(<MapContainer {...defaults} {...props} />);
  }

  it('renders map even if not loaded', () => {
    const map = getWrapper({ isLoaded: false }).find(Map);
    expect(map).to.have.length(1);
  });

  it('renders a Leaflet Map', () => {
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

    it('have popups as children', () => {
      const markers = [{ id: '32', latitude: 0, longitude: 0 }];
      const marker = getWrapper({ markers }).find(Marker);
      const popup = marker.find(Popup);
      expect(popup).to.have.length(1);
      expect(popup.prop('id')).to.equal('32');
    });
  });

  describe('onMapRef', () => {
    function callOnMapRef(fitBounds, boundaries, extra = {}) {
      const wrapper = getWrapper(Object.assign(extra, { boundaries }));
      wrapper.instance().onMapRef({ leafletElement: { fitBounds } });
    }

    it('calls fitBounds on Leaflet map', () => {
      const fitBounds = simple.mock();
      callOnMapRef(fitBounds, {
        maxLatitude: 10,
        minLatitude: 5,
        maxLongitude: 20,
        minLongitude: 15,
      });
      expect(fitBounds.callCount).to.equal(1);
      expect(fitBounds.lastCall.args).to.deep.equal([
        [[5, 15], [10, 20]],
      ]);
    });

    it('does not call fitBounds if not loaded', () => {
      const fitBounds = simple.mock();
      callOnMapRef(fitBounds, {
        maxLatitude: 10,
        minLatitude: 5,
        maxLongitude: 20,
        minLongitude: 15,
      }, { isLoaded: false });
      expect(fitBounds.called).to.be.false;
    });
  });

  describe('componentDidUpdate', () => {
    function callComponentDidUpdate(prevBoundaries, boundaries, fitBounds) {
      const instance = getWrapper({ boundaries }).instance();
      instance.map = { leafletElement: { fitBounds } };
      instance.componentDidUpdate({ boundaries: prevBoundaries });
    }

    it('calls fitBounds if boundaries changed', () => {
      const prev = { maxLatitude: 0, minLatitude: 0, maxLongitude: 0, minLongitude: 0 };
      const next = { maxLatitude: 1, minLatitude: 0, maxLongitude: 0, minLongitude: 0 };
      const fitBounds = simple.mock();
      callComponentDidUpdate(prev, next, fitBounds);
      expect(fitBounds.callCount).to.equal(1);
      expect(fitBounds.lastCall.args).to.deep.equal([
        [[0, 0], [1, 0]],
      ]);
    });

    it('does not call fitBounds if boundaries did not change', () => {
      const prev = { maxLatitude: 0, minLatitude: 0, maxLongitude: 0, minLongitude: 0 };
      const fitBounds = simple.mock();
      callComponentDidUpdate(prev, prev, fitBounds);
      expect(fitBounds.called).to.be.false;
    });
  });
});
