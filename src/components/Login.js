import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { FormInput } from "./FormInput";
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    // Logout, to reset status
    this.props.onLogout();

    // Initial state
    this.state = {
      email: '', // Holds the email
      password: '', // Holds the password
      attemptedSubmit: false // Tells us if the user clicked submit
    };

    // Bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props.isAuthenticated);
  }

  // Save input changes to current state
  // Note: name and value are retrieved from HTML below
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }); // Square brackets are important for syntax
  }

  // When form is submit, check basic requirements and make appropriate
  // call to container if met. TODO: possible refactor
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ attemptedSubmit: true });
    this.props.onLogin(this.state);
  }

  // Render HTML
  render() {
    if(this.props.isAuthenticated) {
      // Redirect if authenticated
      return <Redirect to="/dashboard" />;
    } else {

      // Div for when there is an error when submitting
      // Only shown if not fetching from server and already attempted to submit
      let errorDiv = ( this.state.attemptedSubmit && !this.props.isFetching ? (
          <div className="alert alert-danger">Login failed with the provided username and password.</div>
        ) : '');

      return (
        <div className="container">

          {/* Login Header. TODO: sticky and add <faChevronUp /> */}
          <div className="header">
            <h1>Login</h1>
          </div>

          {/* Sign Up Form */}
          <Form name="form" onSubmit={this.handleSubmit}>

            {/* Display errors, if necessary */}
            {errorDiv}

            {/* Email */}
            <FormInput
              name="email"
              displayName="Email"
              type="email"
              handleChange={this.handleChange}
              attemptedSubmit={this.state.attemptedSubmit}
              value={this.state.email}
            />

            {/* Password */}
            <FormInput
              name="password"
              displayName="Password"
              type="password"
              handleChange={this.handleChange}
              attemptedSubmit={this.state.attemptedSubmit}
              value={this.state.password}
            />

            {/* Buttons */}
            <div className="btn-toolbar">
              <Link to="/" className="btn btn-default">Back</Link>
              <button className="btn btn-primary pull-right" type="submit">Login</button>
              <Link to="/signup" className="btn btn-default pull-right">Sign Up</Link>
            </div>

          </Form>
        </div>
      );
    }
  }
}
