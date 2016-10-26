import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import uiActions from 'actions/uiActions';
import Select from 'screens/sidebar/Select';
import selector from './postalCodeFilterSelector';

export function UnconnectedPostalCodeFilterContainer(props) {
  return (
    <div className="postal-code-filter">
      <h5>Postinumero</h5>
      <Select
        onChange={props.onSelect}
        options={props.postalCodes.map(code => ({ value: code, label: code }))}
        value={props.selectedPostalCodes}
      />
    </div>
  );
}

UnconnectedPostalCodeFilterContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
  postalCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedPostalCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const actions = {
  onSelect: value => uiActions.changePostalCodeFilter(value),
};

export default connect(selector, actions)(UnconnectedPostalCodeFilterContainer);
