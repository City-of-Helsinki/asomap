/* eslint-disable global-require */

import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from 'screens/App';
import store from 'state/store';

const rootEl = document.getElementById('root');

ReactDom.render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('screens/App', () => {
    const NextApp = require('screens/App').default;

    ReactDom.render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      rootEl
    );
  });
}
