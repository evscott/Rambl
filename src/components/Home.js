import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Rambl</h1>
          <p>Welcome to Rambl. Your future is here.</p>
          <Link to="/signup" className="btn btn-link"><button>Sign Up</button></Link>
          <Link to="/login" className="btn btn-link"><button>Log In</button></Link>
          <Link to="/about" className="btn btn-link"><button>About Rambl</button></Link>
        </div>
      </div>
    );
  }
}
