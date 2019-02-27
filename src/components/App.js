import React, { Component } from 'react';
import './App.css';
import Routes from '../Routes';
import { login } from '../redux/actions/authActions';
import configureStore from '../redux/store/configureStore';
import { addTranToDb, deleteTranInDb, getTransFromDb, updateTranInDb } from '../redux/actions/tranActions';
import { getPlansFromDb, updatePlanInDb } from '../redux/actions/planActions';
import { getAccomsFromDb, updateAccomInDb } from '../redux/actions/accomActions';
const store = configureStore();

class App extends Component {
  constructor() {
    super();
    store.dispatch(login({email: "graeme@gmail.com", password: "password" }));
    // store.dispatch(getTrips());
    // store.dispatch(getAccoms());
    // store.dispatch(getPlans());
    store.dispatch(getAccomsFromDb());
    setTimeout(() => {
      store.dispatch(updateAccomInDb({trip_id: 11, e_id: 3, dscript: "Updating new stuff"}));
    }, 5000);
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
