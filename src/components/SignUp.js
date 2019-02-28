import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from "react-router-dom";
import { FormInput } from "./FormInput";
import "./SignUp.css";

export default class SignUp extends Component{
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      f_name: '', // Holds first name
      l_name: '', // Holds last name
      email: '', // Holds email
      confirmEmail: '', // Holds email confirmation
      password: '', // Holds password
      confirmPassword: '', // Holds password confirmation
      attemptedSubmit: false // Tells us if the user clicked submit
    };

    // Bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { f_name, l_name, email, confirmEmail, password, confirmPassword } = this.state;
    /* If all fields exist, and confirmations match, attempt sign up
    This feels redundant. If anyone can suggest a simpler way to
    do this that would be great */
    if (f_name && l_name && email && confirmEmail && password && confirmPassword) {
      if(password === confirmPassword && email === confirmEmail){
        this.props.onSignUp({ f_name, l_name, email, password});
      }
    }
  }

  // Render HTML
  render(){
    // Redirect if authenticated TODO: redirect to thank you page
    if(this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    } else {
      // Div for when there is an error when submitting
      // Only shown if not fetching from server and already attempted to submit
      let errorDiv = (this.state.attemptedSubmit && !this.props.isFetching ? (
        <div className="alert alert-danger">Sign up failed. See fields for more information.</div>
      ) : '');

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
              <Link to="/" className="btn btn-default">Back</Link>
              <Link to="/login" className="btn btn-default">Login</Link>
              <button className="btn btn-primary pull-right" type="submit">Sign Up</button>
            </div>

          </Form>
        </div>
      );
    }
  }
}
