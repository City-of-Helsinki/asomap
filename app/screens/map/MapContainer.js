import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';

import selector from './mapSelector';

const defaultPosition = [60.1699, 24.9384];

export function UnconnectedMapContainer(props) {
  return (
    <Map className="map" center={defaultPosition} zoom={12} zoomControl={false}>
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
      {props.markers.map(marker => (
        <Marker key={marker.id} position={[marker.latitude, marker.longitude]} />
      ))}
    </Map>
  );
}

UnconnectedMapContainer.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(selector)(UnconnectedMapContainer);
