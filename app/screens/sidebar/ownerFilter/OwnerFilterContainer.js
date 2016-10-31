import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import uiActions from 'actions/uiActions';
import Select from 'screens/sidebar/Select';
import selector from './ownerFilterSelector';

export function UnconnectedOwnerFilterContainer(props) {
  return (
    <div className="owner-filter">
      <h5>Omistaja</h5>
      <Select
        onChange={props.onSelect}
        options={props.owners.map(owner => ({
          label: `${owner.name} (${owner.unitCount})`,
          value: owner.name,
        }))}
        value={props.selectedOwners}
      />
    </div>
  );
}

UnconnectedOwnerFilterContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
  owners: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    unitCount: PropTypes.number.isRequired,
  })).isRequired,
  selectedOwners: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const actions = {
  onSelect: value => uiActions.changeOwnerFilter(value),
};

export default connect(selector, actions)(UnconnectedOwnerFilterContainer);
