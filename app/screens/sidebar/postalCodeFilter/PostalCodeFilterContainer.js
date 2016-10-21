import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import uiActions from 'actions/uiActions';
import selector from './postalCodeFilterSelector';

export function UnconnectedPostalCodeFilterContainer(props) {
  return (
    <select className="postal-code-filter" multiple onChange={props.onSelect} value={props.selectedPostalCodes}>
      {props.postalCodes.map(code => (
        <option key={code} value={code}>{code}</option>
      ))}
    </select>
  );
}

UnconnectedPostalCodeFilterContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
  postalCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedPostalCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const actions = {
  onSelect: (event) => {
    const selected = Array.from(event.target.selectedOptions);
    const value = selected.map(option => option.value);
    return uiActions.changePostalCodeFilter(value);
  },
};

export default connect(selector, actions)(UnconnectedPostalCodeFilterContainer);
