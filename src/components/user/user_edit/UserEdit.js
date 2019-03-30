import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './UserEdit.css';
import { SubmitButton } from '../../global/SubmitButton';
import { ReturnButton } from '../../global/ReturnButton';
import { TogglePasswordChange } from '../password_change/TogglePasswordChange';
import { PasswordChange } from '../password_change/PasswordChange';

/**
 * User edit form. Users can change their name and/or their password by using
 * a toggle password change button.
 */
export class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changePassword: false,
      f_name: this.props.f_name,
      l_name: this.props.l_name,
      oldPassword: null,
      newPassword: null,
      confirmPassword: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Updates user information - password defaults to current password
   * if new password is not provided as argument.
   */
  updateUser(password = this.props.currentPassword) {
    this.props.updateUser({
      f_name: this.state.f_name,
      l_name: this.state.l_name,
      password: password
    });
  }

  /**
   * Checks for any errors if a submission has been attempted and user password
   * is being changed.
   */
  checkForError() {
    if (this.state.attemptedSubmit && this.state.changePassword) {
      if (!this.compareOldPasswords())
        return (
          <div className="alert alert-danger">
            Old password does not match current password.
          </div>
        );
      if (this.compareNewPasswords())
        return (
          <div className="alert alert-danger">New passwords do not match.</div>
        );
    }
    return null;
  }

  /**
   * Compares the current password to the users input.
   */
  compareOldPasswords() {
    if (this.state.oldPassword !== this.props.currentPassword) {
      return false;
    }
    return true;
  }

  /**
   * Compares the new password to its confirmation.
   */
  compareNewPasswords() {
    if (this.state.newPassword !== this.state.confirmPassword) {
      return false;
    }
    return true;
  }

  /***************************** Core functions *****************************/

  /**
   * Updates the users information with their new password or with original.
   * Returns the modal to view mode from edit mode.
   * Sets the attemptedSubmit state to true to detect errors if any are encountered.
   */
  onUpdate() {
    this.setState({ attemptedSubmit: true });
    if (this.state.changePassword) this.updateWithNewPassword();
    else this.updateUser();
    this.props.onReturn();
  }

  /**
   * Updates the users information with their new password if conditions
   * are satisfied.
   */
  updateWithNewPassword() {
    if (this.compareOldPasswords() && this.compareNewPasswords()) {
      this.updateUser(this.state.newPassword);
    }
  }

  /**
   * Handles input changes by assigning values to target names. Resets an
   * attempted submission in case user is attempting to correct an error.
   * @param e
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, attemptedSubmit: false });
  }

  /**
   * Toggles whether a user wants to change their password or not.
   */
  changePassword() {
    this.setState({ changePassword: !this.state.changePassword });
  }

  /**************************** Visual component ****************************/

  render() {
    let errorMessage = this.checkForError();
    return (
      <div>
        <Form>
          {/* Name change */}
          <Form.Row>
            <Col>
              <Form.Label>Your first name</Form.Label>
              <Form.Control
                placeholder={this.props.f_name}
                name={'f_name'}
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                placeholder={this.props.l_name}
                name={'l_name'}
                onChange={this.handleChange}
              />
            </Col>
          </Form.Row>
        </Form>
        {/* Password change */}
        <TogglePasswordChange toggle={this.changePassword} />
        {errorMessage}
        <PasswordChange
          changePassword={this.state.changePassword}
          handleChange={this.handleChange}
        />
        {/* Buttons */}
        <div className={'buttons'}>
          {/* Submit */}
          <div className={'submit-button'}>
            <SubmitButton handleChange={this.onUpdate} />
          </div>
          {/* Return */}
          <div className={'return-button'}>
            <ReturnButton handleChange={this.props.onReturn} />
          </div>
        </div>
      </div>
    );
  }
}

UserEdit.propTypes = {
  onReturn: PropTypes.func.isRequired
};
