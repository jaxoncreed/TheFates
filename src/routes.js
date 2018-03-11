import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Layout from './components/layout/Layout.jsx';
import Home from './components/home/Home.jsx';
import Assignment from './components/assignment/Assignment.jsx';
import SubmitAssignment from './components/submitAssignment/SubmitAssignment.jsx';
import Profile from './components/profile/Profile.jsx';

export default () => {
  return (
    <Route path="/" component={Layout}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="/assignment" component={SubmitAssignment}/>
      <Route path="/assignment/:id" component={Assignment} />
      <Route path="/profile" component={Profile} />

      { /* Catch all route */ }
      { /* <Route path="*" component={NotFound} status={404} /> */ }
    </Route>
  );
};
