import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store/configureStore';
import { login } from '../redux/actions/authActions';
import { getTrips } from '../redux/actions/tripActions';

const store = configureStore();

export default class Root extends Component {
  constructor() {
    super();

    store.dispatch(
      login({
        email: 'Root',
        password: 'Root'
      })
    );

    store.dispatch(getTrips());
  }

  render() {
    return <Provider store={store} />;
  }
}
