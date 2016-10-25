import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import uiActions from 'actions/uiActions';
import CityFilter from './cityFilter';
import OwnerFilter from './ownerFilter';
import PostalCodeFilter from './postalCodeFilter';
import selector from './sidebarSelector';

export function UnconnectedSidebarContainer(props) {
  if (!props.isLoaded) return <div />;
  return (
    <div className={classNames('sidebar', { 'sidebar-collapsed': props.isCollapsed })}>
      <a className="header-link" href="#sidebar" onClick={props.onHeaderClick}><h4>Suodata kohteita</h4></a>
      <div className="sidebar-container">
        <CityFilter />
        <PostalCodeFilter />
        <OwnerFilter />
      </div>
    </div>
  );
}

UnconnectedSidebarContainer.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
};

const actions = {
  onHeaderClick: (event) => {
    event.preventDefault();
    return uiActions.toggleSidebar();
  },
};

export default connect(selector, actions)(UnconnectedSidebarContainer);
