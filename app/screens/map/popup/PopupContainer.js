import React, { PropTypes } from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';

import selector from './popupSelector';

export function UnconnectedPopupContainer(props) {
  return (
    <Popup>
      <div>
        <div className="owner">Omistaja: {props.owner}</div>
        <div className="name">Nimi: {props.name}</div>
        <div className="streetAddress">Osoite: {props.streetAddress}</div>
        <div className="addressZip">Postinumero: {props.addressZip}</div>
        <div className="city">Kaupunki: {props.city}</div>
        <div className="url"><a href={props.url}>WWW-sivu</a></div>
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
