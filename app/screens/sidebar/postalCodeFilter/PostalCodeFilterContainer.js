import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import selector from './postalCodeFilterSelector';

export function UnconnectedPostalCodeFilterContainer(props) {
  return (
    <select className="postal-code-filter" multiple>
      {props.postalCodes.map(code => (
        <option key={code} value={code}>{code}</option>
      ))}
    </select>
  );
}

UnconnectedPostalCodeFilterContainer.propTypes = {
  postalCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(selector)(UnconnectedPostalCodeFilterContainer);
