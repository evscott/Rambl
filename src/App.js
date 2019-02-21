import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Root from "./containers/Root";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            [In Development]
          </p>
        </header>
        <Root>document.getElementById("root")</Root>
      </div>
    );
  }
}

export default App;
