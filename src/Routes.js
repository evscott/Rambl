import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/auth/landing/Landing';
import LoginContainer from './components/auth/login/LoginContainer';
import SignUpContainer from './components/auth/signup/SignUpContainer';
import DashboardContainer from './components/home/DashboardContainer';
import DisplayUserInfoContainer from './components/user_view/display_user_info/DisplayUserInfoContainer';
import EditUserInfoContainer from './components/user_view/edit_user_info/EditUserInfoContainer';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/signup" component={SignUpContainer} />
      <Route exact path="/dashboard" component={DashboardContainer} />
      <Route exact path="/userinfo" component={DisplayUserInfoContainer} />
      <Route exact path="/userinfo/edit" component={EditUserInfoContainer} />
    </Switch>
  </Router>
);
