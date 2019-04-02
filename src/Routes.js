import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingContainer from './components/auth/landing/LandingContainer';
import LoginContainer from './components/auth/login/LoginContainer';
import SignUpContainer from './components/auth/signup/SignUpContainer';
import DashboardContainer from './components/dashboard/DashboardContainer';
import { TripView } from './components/trip_view/TripView';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingContainer} />
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/signup" component={SignUpContainer} />
      <Route exact path="/dashboard" component={DashboardContainer} />
      <Route exact path="/trip" component={TripView} />
    </Switch>
  </Router>
);
