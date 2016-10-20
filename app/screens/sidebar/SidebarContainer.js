import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CityFilter from './cityFilter';
import selector from './sidebarSelector';

export function UnconnectedSidebarContainer(props) {
  if (!props.isLoaded) return <div />;
  return (
    <div className="sidebar">
      <CityFilter />
    </div>
  );
}

UnconnectedSidebarContainer.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(selector)(UnconnectedSidebarContainer);
