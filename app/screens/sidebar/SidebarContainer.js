import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import uiActions from 'actions/uiActions';
import selector from './sidebarSelector';

export function UnconnectedSidebarContainer({ changeMessage, message }) {
  return (
    <div className="sidebar">
      <h4>You have 1 message:</h4>
      <p>{message}</p>
      <button onClick={changeMessage} >
        Change messega
      </button>
    </div>
  );
}

UnconnectedSidebarContainer.propTypes = {
  changeMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

const actions = {
  changeMessage: uiActions.changeMessage,
};

export default connect(selector, actions)(UnconnectedSidebarContainer);
