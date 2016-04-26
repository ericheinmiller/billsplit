import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from 'routes.jsx';
import configureStore from 'store/configureStore';
import { fetchComponentDataBeforeRender } from 'api/fetchComponentDataBeforeRender';
import apiClient from 'api/apiClient';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

// Setting Global server variable to be false
window.__SERVER__ = false;

const client = apiClient();
const store = configureStore(initialState, browserHistory, client);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }
  const { state: { components, params } } = this;
  fetchComponentDataBeforeRender(store.dispatch, components, params);
}


// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
  <Provider store={store}>
    <Router history={history} onUpdate={onUpdate}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
