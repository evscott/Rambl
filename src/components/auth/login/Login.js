import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FormInput } from '../../global/FormInput';
import './Login.css';

/**
 *  Login handles the display for logging in along with associated
 *  redirection, and error message
 */
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
    this.stateIsComplete = this.stateIsComplete.bind(this);
    this.getUserObject = this.getUserObject.bind(this);
    this.userInfoRetrieved = this.userInfoRetrieved.bind(this);
  }

  /**************************** Helper functions ****************************/

  stateIsComplete() {
    return this.state.email && this.state.password;
  }

  getUserObject() {
    return {
      email: this.state.email,
      password: this.state.password
    };
  }

  userInfoRetrieved() {
    return (
      this.props.isAuthenticated &&
      !this.props.isFetching &&
      this.props.isSynced
    );
  }

  /***************************** Core functions *****************************/

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ attemptedSubmit: true });
    if (this.stateIsComplete()) {
      this.props.onLogin(this.getUserObject());
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  /**************************** Visual component ****************************/

  render() {
    if (this.userInfoRetrieved()) {
      return <Redirect to="/dashboard" />;
    } else {
      let errorDiv = '';
      if (
        this.state.attemptedSubmit &&
        !this.props.isAuthenticated &&
        !this.props.isFetching
      ) {
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
            <h2>Sign In</h2>
          </div>

          {/* Sign Up Form */}
          <div className="flex-wrap-center">
            <Form className="form" onSubmit={this.handleSubmit}>
              {/* Display errors, if necessary */}
              {errorDiv}

              <div className="form-input form-blue">
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
              </div>

              {/* Buttons */}
              <div className="flex-wrap-center">
                <Link to="/" className="btn btn-landing btn-blue">
                  Back
                </Link>
                <Button className="btn btn-landing btn-blue" type="submit">
                  Sign In
                </Button>
              </div>
              <Link to="/signup" className="btn btn-default">
                Sign Up
              </Link>
            </Form>
          </div>
        </div>
      );
    }
  }
}
