import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import Layout from 'web/components/layout/Layout.js';
import Home from 'web/components/home/Home.js';
import Game from 'web/components/game/Game.js';

export default (history) => (
  <Router history={history}>
    <Route component={ Layout } >
      <Route path="/" component={ Home } />
      <Route path="/game" component={ Game } />
    </Route>
  </Router>
)