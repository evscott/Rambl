import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { FormInput } from '../../global/FormInput';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      attemptedSubmit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /***************************** Core functions *****************************/

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ attemptedSubmit: true });
    if (this.email && this.password) {
      this.props.onLogin(this.state);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  /**************************** Visual component ****************************/

  render() {
    if (this.props.isAuthenticated && !this.props.isFetching) {
      return <Redirect to="/dashboard" />;
    } else {

      let errorDiv = '';
      if (this.state.attemptedSubmit && !this.props.isFetching) {
        errorDiv = (
          <div className="alert alert-danger">
            Login failed with the provided username and password.
          </div>
        );
      }

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
              <Link to="/" className="btn btn-default">
                Back
              </Link>
              <Link to="/signup" className="btn btn-default">
                Sign Up
              </Link>
              <button className="btn btn-primary pull-right" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
      );
    }
  }
}
