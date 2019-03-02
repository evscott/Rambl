import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/auth/landing/Landing';
import LoginContainer from './containers/auth/LoginContainer';
import SignUpContainer from './containers/auth/SignUpContainer';
import DashboardContainer from './containers/home/DashboardContainer';

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
