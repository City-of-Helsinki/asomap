import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';

import selector from './mapSelector';
import Popup from './popup';

const defaultPosition = [60.1699, 24.9384];

export class UnconnectedMapContainer extends React.Component {
  constructor() {
    super();
    this.onMapRef = this.onMapRef.bind(this);
  }

  onMapRef(map) {
    map.leafletElement.fitBounds(this.getBounds());
  }

  getBounds() {
    const boundaries = this.props.boundaries;
    return [
      [boundaries.minLatitude, boundaries.minLongitude],
      [boundaries.maxLatitude, boundaries.maxLongitude],
    ];
  }

  render() {
    if (!this.props.isLoaded) return <div />;
    return (
      <Map
        className="map"
        center={defaultPosition}
        zoom={12}
        zoomControl={false}
        ref={this.onMapRef}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />
        {this.props.markers.map(marker => (
          <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
            <Popup id={marker.id} />
          </Marker>
        ))}
      </Map>
    );
  }
}

UnconnectedMapContainer.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  })),
  boundaries: PropTypes.shape({
    maxLatitude: PropTypes.number,
    minLatitude: PropTypes.number,
    maxLongitude: PropTypes.number,
    minLongitude: PropTypes.number,
  }),
};

export default connect(selector)(UnconnectedMapContainer);
