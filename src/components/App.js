import React, { Component } from 'react';
import './App.css';
import Root from "../containers/Root";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            [In Development]
          </p>
          <Root>document.getElementById("root")</Root>
        </header>
      </div>
    );
  }
}

export default App;