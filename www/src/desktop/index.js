import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { matchRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import Router from 'Router';
import Frame from 'frame';
import routes from 'desktop/sys/route';
import reducers from 'desktop/sys/reducer';
import './initFetch';
import './packOptimize';

const history = createBrowserHistory();
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  window.__INITIAL_STATE__,
  compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

class Container extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Frame>
            <Router {...this.props} />
          </Frame>
        </ConnectedRouter>
      </Provider>
    );
  }
}

let App = {
  init: function () {
    let { location } = history;
    let curRoute = matchRoutes(routes, location.pathname)
      .filter(route => route.match.isExact)
      .map(route => route.route)[0];
    if (curRoute && curRoute.loader) {
      curRoute.loader(mod => {
        curRoute.component = mod.default ? mod.default : mod;
        delete curRoute.loader;
        this.render(curRoute);
      });
    } else {
      this.render(curRoute);
    }
  },
  render: function (route) {
    render(<Container routes={routes} initialRoute={route} />, document.getElementById('app'));
  },
};
App.init();
