import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store/configureStore';
import { login } from '../redux/actions/authActions';
import { getTrips, updateTrip } from '../redux/actions/tripActions';

const store = configureStore();

export default class Root extends Component {
  constructor() {
    super();

    store.dispatch(
      login({
        email: 'graeme@gmail.com',
        password: 'password'
      })
    ).then(() => {
      store.dispatch(updateTrip({trip_id: 86, name: "redux trip blah blah", dscript: ""}));
    });

    store.dispatch(getTrips());


  }

  render() {
    return <Provider store={store} />;
  }
}
