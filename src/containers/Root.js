import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store/configureStore';
import { login } from '../redux/actions/authActions';
import { getTrans, addTran } from '../redux/actions/tranActions';
import { getTrips } from '../redux/actions/tripActions';

const store = configureStore();

export default class Root extends Component {
  constructor() {
    super();

    store.dispatch(
      login({
        email: 'graeme@gmail.com',
        password: 'password'
      })
    );

    store.dispatch(getTrans());
    store.dispatch(getTrips());

    setTimeout(() => {
      store.dispatch(addTran({trip_id: 86, dscript: "biggy"}));
    }, 10000);

  }

  render() {
    return <Provider store={store} />;
  }
}
