import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from 'screens/AppContainer';
import store from 'state/store';

import 'assets/styles/app.less';

const rootEl = document.getElementById('root');

ReactDom.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('screens/AppContainer', () => {
    const NextApp = require('screens/AppContainer').default; // eslint-disable-line global-require

    ReactDom.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
