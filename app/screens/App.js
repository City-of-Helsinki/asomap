import React from 'react';
import DocumentTitle from 'react-document-title';

import Map from 'screens/map';
import Sidebar from 'screens/sidebar';

function App() {
  return (
    <div className="app">
      <DocumentTitle title="Asumisoikeusasuntojen karttapalvelu" />
      <Map />
      <Sidebar />
    </div>
  );
}

App.propTypes = {};

export default App;
