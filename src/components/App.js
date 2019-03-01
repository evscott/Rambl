import React, { Component } from 'react';
import './App.css';
import Routes from '../Routes';
import configureStore from '../redux/store/configureStore';
import { login, logout } from '../redux/actions/authActions';
import { getTripsFromDb } from '../redux/actions/tripActions';
import { getPlansFromDb } from '../redux/actions/planActions';
import { getTransFromDb } from '../redux/actions/tranActions';
import { getAccomsFromDb } from '../redux/actions/accomActions';

const store = configureStore();

class App extends Component {
  constructor() {
    super();
    console.log(process.env);
    store.dispatch(login({email: "graeme@gmail.com", password: "password"}));
    store.dispatch(getTripsFromDb());
    store.dispatch(getPlansFromDb());
    store.dispatch(getTransFromDb());
    store.dispatch(getAccomsFromDb());
  }
  render() {
    return (
      <div className="App container">
        <Routes />
      </div>
    );
  }
}

export default App;