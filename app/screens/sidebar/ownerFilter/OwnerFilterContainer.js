import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import uiActions from 'actions/uiActions';
import selector from './ownerFilterSelector';

export function UnconnectedOwnerFilterContainer(props) {
  return (
    <div className="owner-filter">
      <h5>Omistaja</h5>
      <select multiple onChange={props.onSelect} value={props.selectedOwners}>
        {props.owners.map(owner => (
          <option key={owner} value={owner}>{owner}</option>
        ))}
      </select>
    </div>
  );
}

UnconnectedOwnerFilterContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
  owners: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOwners: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const actions = {
  onSelect: (event) => {
    const selected = Array.from(event.target.selectedOptions);
    const value = selected.map(option => option.value);
    return uiActions.changeOwnerFilter(value);
  },
};

export default connect(selector, actions)(UnconnectedOwnerFilterContainer);
