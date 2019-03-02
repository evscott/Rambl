import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import { FormInput } from '../../global/FormInput';
import './SignUp.css';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      f_name: '',
      l_name: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      attemptedSubmit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // TODO - should these be handled in a container?
  /**************************** Helper functions ****************************/

  stateIsComplete() {
    if (
      (this.state.f_name,
      this.state.l_name,
      this.state.email,
      this.state.confirmEmail,
      this.state.password,
      this.state.confirmPassword)
    ) {
      return true;
    }
    return false;
  }

  credentialsMatch() {
    return (
      this.state.email === this.state.confirmEmail &&
      this.state.password === this.state.confirmPassword
    );
  }

  getUserObject() {
    return {
      f_name: this.state.f_name,
      l_name: this.state.l_name,
      email: this.state.email,
      password: this.state.password
    };
  }

  /***************************** Core functions *****************************/

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ attemptedSubmit: true });
    if (this.stateIsComplete() && this.credentialsMatch()) {
      this.props.onSignUp(this.getUserObject());
    }
  }

  /**************************** Visual component ****************************/

  render() {
    if (this.props.isAuthenticated && this.props.isFetching === false) {
      return <Redirect to="/dashboard" />;
    } else {
      // Display error if credential mismatch TODO - this is difficult to read
      let errorDiv =
        this.state.attemptedSubmit && !this.props.isFetching ? (
          <div className="alert alert-danger">
            Sign up failed. See fields for more information.
          </div>
        ) : (
          ''
        );

      return (
        <div className="container">
          {/* Sign Up Header. TODO: sticky and add <faChevronUp /> */}
          <div className="header">
            <h1>Sign Up</h1>
          </div>

          {/* Sign Up Form */}
          <Form name="form" onSubmit={this.handleSubmit}>
            {/* Display errors, if necessary */}
            {errorDiv}

            {/* First Name */}
            <FormInput
              name="f_name"
              displayName="First Name"
              type="text"
              handleChange={this.handleChange}
              attemptedSubmit={this.state.attemptedSubmit}
              value={this.state.f_name}
            />

            {/* Last Name */}
            <FormInput
              name="l_name"
              displayName="Last Name"
              type="text"
              handleChange={this.handleChange}
              attemptedSubmit={this.state.attemptedSubmit}
              value={this.state.l_name}
            />

            {/* Email */}
            <FormInput
              name="email"
              displayName="Email"
              type="email"
              handleChange={this.handleChange}
              attemptedSubmit={this.state.attemptedSubmit}
              value={this.state.email}
            />

            {/* Confirm Email */}
            <FormInput
              name="confirmEmail"
              displayName="Confirm Email"
              type="email"
              handleChange={this.handleChange}
              attemptedSubmit={this.state.attemptedSubmit}
              value={this.state.confirmEmail}
              compare={this.state.email}
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

            {/* Confirm Password */}
            <FormInput
              name="confirmPassword"
              displayName="Confirm Password"
              type="password"
              handleChange={this.handleChange}
              attemptedSubmit={this.state.attemptedSubmit}
              value={this.state.confirmPassword}
              compare={this.state.password}
            />

            {/* Buttons */}
            <div className="btn-toolbar">
              <Link to="/" className="btn btn-default">
                Back
              </Link>
              <Link to="/login" className="btn btn-default">
                Login
              </Link>
              <button className="btn btn-primary pull-right" type="submit">
                Sign Up
              </button>
            </div>
          </Form>
        </div>
      );
    }
  }
}
