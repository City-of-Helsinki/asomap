import React, { PropTypes } from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';

import selector from './popupSelector';

function getShowableUrl(url) {
  return url
    // http://example.com/ -> example.com/
    // https://example.com/ -> example.com/
    .replace(/^https?:\/\//, '')
    // example.com/ -> example.com
    // example.com/path/ -> example.com/path/
    .replace(/^([^\/]+)\/$/, '$1');
}

export function UnconnectedPopupContainer(props) {
  return (
    <Popup>
      <div className="popup">
        <h4 className="popup-name">{props.name}</h4>
        <div className="popup-content">
          <div className="popup-owner">{props.owner}</div>
          <div className="popup-address">
            <span className="popup-street-address">{props.streetAddress}</span>
            <span className="popup-postal-code">{props.addressZip}</span>
            <span className="popup-city">{props.city}</span>
          </div>
          <div className="popup-url"><a href={props.url}>{getShowableUrl(props.url)}</a></div>
        </div>
      </div>
    </Popup>
  );
}

UnconnectedPopupContainer.propTypes = {
  addressZip: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  streetAddress: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default connect(selector)(UnconnectedPopupContainer);
