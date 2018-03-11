import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import Layout from 'web/components/layout/Layout.js';
import RewardsPage from 'web/components/rewards/RewardsPage.js';
import SurveyListPage from 'web/components/surveys/SurveyListPage.js';
import IndividualSurveyPage from 'web/components/surveys/IndividualSurveyPage.js';
import ProfilePage from 'web/components/profile/ProfilePage.js';

export default (history) => (
  <Router history={history}>
    <Route component={ Layout } >
      <Route path="/rewards" component={ RewardsPage } />
      <Route path="/surveys" component={ SurveyListPage } />
      <Route path="/surveys/:surveyId" component={ IndividualSurveyPage } />
      <Route path="/profile" component={ ProfilePage } />
      <Route path="/profile/accountsettings" component={ ProfilePage } />
      <Route path="/profile/aboutme" component={ ProfilePage } />
      <Route path="/profile/notifications" component={ ProfilePage } />
      <Route path="/profile/changepassword" component={ ProfilePage } />
      <Redirect from="/" to="/surveys" />
    </Route>
  </Router>
)