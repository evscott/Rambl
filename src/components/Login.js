import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import { FormInput} from "./FormInput";
import './Login.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    // logout, to reset status
    this.props.onLogout();

    this.state = {
      email: '', // Holds the email
      password: '', // Holds the password
      attemptedSubmit: false // Tells us if they clicked submit
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // Get the input's "name" attribute and its
    // "value" attribute, puts both into the state.
    const { name, value } = e.target;
    this.setState({ [name]: value }); // Square brackets are important for syntax
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ attemptedSubmit: true });
    // If not blank, we attempt login
    if (this.state.email && this.state.password) {
      this.props.onLogin(this.state);
    }
  }

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
        <div className="col-md-6 col-md-offset-3">
          <h2>Login</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            {errorDiv}
            <FormInput
              name="email"
              displayName="Email"
              type="text"
              handleChange={this.handleChange}
              error={this.state.attemptedSubmit}
              value={this.state.email}
            />
            <FormInput
              name="password"
              displayName="Password"
              type="password"
              handleChange={this.handleChange}
              error={this.state.attemptedSubmit}
              value={this.state.password}
            />
            <div className="btn-toolbar">
              <Link to="/" className="btn btn-default">Back</Link>
              <button className="btn btn-primary pull-right" type="submit">Login</button>
              <Link to="/signup" className="btn btn-default pull-right">Sign Up</Link>
            </div>
          </form>
        </div>
      );
    }
  }
}
