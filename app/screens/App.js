import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Provider } from 'react-redux';

import SidebarContainer from 'screens/sidebar/SidebarContainer';

function App({ store }) {
  return (
    <Provider store={store}>
      <div className="app">
        <DocumentTitle title="Asumisoikeusasuntojen karttapalvelu" />
        <h1>Hello World!</h1>
        <SidebarContainer />
      </div>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line
};

export default App;
