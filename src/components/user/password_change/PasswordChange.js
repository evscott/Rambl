import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

/**
 * This component simply displays a users information.
 */
export class PasswordChange extends Component {
  /**************************** Visual component ****************************/

  render() {
    if (this.props.changePassword)
      return (
        <div>
          {/* Old password */}
          <Form.Group>
            <Form.Label>Your old password</Form.Label>
            <Form.Control
              type={'password'}
              name={'oldPassword'}
              placeholder="Your old password"
              onChange={this.props.handleChange}
            />
          </Form.Group>
          {/* New password */}
          <Form.Group>
            <Form.Label>Your new password</Form.Label>
            <Form.Control
              type={'password'}
              name={'newPassword'}
              placeholder="Your new password"
              onChange={this.props.handleChange}
            />
          </Form.Group>
          {/* Confirm new password */}
          <Form.Group>
            <Form.Label>Confirm your new password</Form.Label>
            <Form.Control
              type={'password'}
              name={'confirmPassword'}
              placeholder="Confirm your new password"
              onChange={this.props.handleChange}
            />
          </Form.Group>
        </div>
      );
    else return null;
  }
}

PasswordChange.propTypes = {
  changePassword: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
};
