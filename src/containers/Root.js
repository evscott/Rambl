import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store/configureStore';
import Signup from './Authentication/Signup';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Signup />
      </Provider>
    );
  }
}
