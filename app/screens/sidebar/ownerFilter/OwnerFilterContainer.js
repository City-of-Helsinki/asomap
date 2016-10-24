import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import selector from './ownerFilterSelector';

export function UnconnectedOwnerFilterContainer(props) {
  return (
    <select className="owner-filter" multiple>
      {props.owners.map(owner => (
        <option key={owner} value={owner}>{owner}</option>
      ))}
    </select>
  );
}

UnconnectedOwnerFilterContainer.propTypes = {
  owners: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(selector)(UnconnectedOwnerFilterContainer);
