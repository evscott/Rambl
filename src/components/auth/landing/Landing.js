import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Rambl</h1>
          <p>Welcome to Rambl. Your future is here.</p>
          <div className="btn-group">
            <Link to="/about" className="btn btn-default">
              About Rambl
            </Link>
            <Link to="/signup" className="btn btn-default">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
