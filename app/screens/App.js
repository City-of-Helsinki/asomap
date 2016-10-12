import React from 'react';
import DocumentTitle from 'react-document-title';

import Sidebar from 'screens/sidebar';

function App() {
  return (
    <div className="app">
      <DocumentTitle title="Asumisoikeusasuntojen karttapalvelu" />
      <h1>Hello World!</h1>
      <Sidebar />
    </div>
  );
}

App.propTypes = {};

export default App;
