import React, { Component } from 'react';
import './App.css';
import Routes from '../Routes';
import { createIconLibrary } from './IconLibrary';

createIconLibrary();

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Routes />
      </div>
    );
  }
}

export default App;
