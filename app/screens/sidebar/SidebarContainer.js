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
      <h4>Suodata kohteita</h4>
      <div className="sidebar-container">
        <CityFilter />
        <PostalCodeFilter />
        <OwnerFilter />
      </div>
    </div>
  );
}

UnconnectedSidebarContainer.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(selector)(UnconnectedSidebarContainer);
