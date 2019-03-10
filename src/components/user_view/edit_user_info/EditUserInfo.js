import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { FormInput } from '../../global/FormInput';
import { Link, Redirect } from 'react-router-dom';

export default class EditUserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.user.email,
      f_name: props.user.f_name,
      l_name: props.user.l_name,
      attemptedSubmit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**************************** Helper functions ****************************/

  stateIsNotEmpty() {
    return this.state.f_name.length > 0 && this.state.l_name.length > 0
      ? true
      : false;
  }

  /***************************** Core functions *****************************/

  handleSubmit(e) {
    e.preventDefault();
    if (this.stateIsNotEmpty()) {
      this.props.update(this.state.f_name, this.state.l_name);
    }
    this.setState({ attemptedSubmit: true });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  /**************************** Visual component ****************************/

  render() {
    let errorDiv = '';
    if (this.state.attemptedSubmit && !this.props.isFetching) {
      errorDiv = (
        <div className="alert alert-danger">
          Update failed with the provided first and last name.
        </div>
      );
    }

    if (this.state.attemptedSubmit === true && this.props.isFetching) {
      return <Redirect to="/userinfo" />;
    } else
      return (
        <div className="container">
          <div className="header">
            <h1>Edit info</h1>
          </div>

          {/* Sign Up Form */}
          <Form name="form" onSubmit={this.handleSubmit}>
            {/* Display errors, if necessary */}
            {errorDiv}

            {/* First name */}
            <FormInput
              placeholder={'Blah'}
              name="f_name"
              displayName="First name"
              type="f_name"
              handleChange={this.handleChange}
              value={this.state.f_name}
            />

            {/* Last name */}
            <FormInput
              name="l_name"
              displayName="Last name"
              type="l_name"
              handleChange={this.handleChange}
              value={this.state.l_name}
            />

            {/* Buttons */}
            <div className="btn-toolbar">
              <Link to="/userinfo" className="btn btn-default">
                Cancel
              </Link>
              <button className="btn btn-primary" type="submit">
                Confirm
              </button>
            </div>
          </Form>
        </div>
      );
  }
}
