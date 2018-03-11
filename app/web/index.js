import React from 'react';
import { render } from 'react-dom';
import configureStore from 'redux/configureStore';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Routes from './Routes';
import muiTheme from './styles/muiTheme';

// load our css
require('./styles/style.scss');

const rootElement = document.getElementById('root');

let initialState = {}

let clientSpecificReducers = {
  routing: routerReducer
}
let clientSpecificMiddleware = [

]

let Component;
if (process.env.NODE_ENV === 'production') {
  const store = configureStore(initialState, clientSpecificReducers, clientSpecificMiddleware);
  const history = syncHistoryWithStore(browserHistory, store);
  Component = (<Provider store={store} key="provider">
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      {Routes(history)}
    </MuiThemeProvider>
  </Provider>);
} else {
  const DevTools = require('./components/devTools/DevTools.js');
  clientSpecificMiddleware.push(DevTools.instrument());
  const store = configureStore(initialState, clientSpecificReducers, clientSpecificMiddleware);
  const history = syncHistoryWithStore(browserHistory, store);
  Component = (<Provider store={store} key="provider">
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <div>
        {Routes(history)}
        <DevTools />
      </div>
    </MuiThemeProvider>
  </Provider>);
}

render(Component, rootElement);
