import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

export default class Home extends Component {
  render() {
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
          <Link to="/about" className="btn btn-red">
            About Rambl
          </Link>
          <Link to="/signup" className="btn btn-yellow">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-blue">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
