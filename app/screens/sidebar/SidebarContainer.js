import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CityFilter from './cityFilter';
import OwnerFilter from './ownerFilter';
import PostalCodeFilter from './postalCodeFilter';
import selector from './sidebarSelector';

export function UnconnectedSidebarContainer(props) {
  if (!props.isLoaded) return <div />;
  return (
    <div className="sidebar">
      <CityFilter />
      <PostalCodeFilter />
      <OwnerFilter />
    </div>
  );
}

UnconnectedSidebarContainer.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(selector)(UnconnectedSidebarContainer);
