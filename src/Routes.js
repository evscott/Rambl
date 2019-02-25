import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import LoginContainer from './containers/LoginContainer';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={LoginContainer} />
  </Switch>
);
