import React from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';

const defaultPosition = [60.1699, 24.9384];

export function UnconnectedMapContainer() {
  return (
    <Map className="map" center={defaultPosition} zoom={12} zoomControl={false}>
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
    </Map>
  );
}

UnconnectedMapContainer.propTypes = {};

export default connect()(UnconnectedMapContainer);
