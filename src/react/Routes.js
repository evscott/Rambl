import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../react/auth/components/landing/Landing';
import LoginContainer from '../react/auth/containers/LoginContainer';
import SignUpContainer from '../react/auth/containers/SignUpContainer';
import DashboardContainer from '../react/dashboard/containers/DashboardContainer';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ LoginContainer } />
      <Route exact path="/signup" component={ SignUpContainer } />
      <Route exact path="/dashboard" component={ DashboardContainer } />
    </Switch>
  </Router>
);
