import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Landing.css';

export default class Home extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <div className="landing">
          <div className="title">
            <h1>
              <span className="red">R</span>
              <span className="yellow">a</span>
              <span className="light-blue">m</span>
              <span className="red">b</span>
              <span className="dark-blue">l</span>
            </h1>
          </div>
          <div className="flex-wrap-center">
            <Link to="/signup" className="btn btn-landing btn-yellow">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-landing btn-blue">
              Sign In
            </Link>
            <Link to="/about" className="btn btn-landing btn-red">
              About Rambl
            </Link>
          </div>
        </div>
      );
    }
  }
}
