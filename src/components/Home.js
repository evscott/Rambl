import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Rambl</h1>
          <p>Welcome to Rambl. Your future is here.</p>
          <button>Sign Up</button>
          <button>Sign In</button>
          <button>About Rambl</button>
        </div>
      </div>
    );
  }
}
