import React, { PropTypes } from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';

import selector from './popupSelector';

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
          <div className="popup-url"><a href={props.url}>WWW-sivu</a></div>
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
