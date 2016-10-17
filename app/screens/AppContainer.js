import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import apiActions from 'actions/apiActions';
import App from './App';

export class UnconnectedAppContainer extends React.Component {
  componentWillMount() {
    this.props.getUnits();
  }

  render() {
    return <App />;
  }
}

UnconnectedAppContainer.propTypes = {
  getUnits: PropTypes.func.isRequired,
};

const actions = {
  getUnits: apiActions.getUnits,
};

export default connect(null, actions)(UnconnectedAppContainer);
