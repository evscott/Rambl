import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UserInfoFormContainer from '../user_info_form/UserInfoFormContainer';

/**
 * This component creates a user information modal. It accepts two properties:
 * show and onHide. Show is a boolean value which determines whether the
 * modal should be displayed, and onHide is a button which toggles the
 * value of show.
 */
export class UserModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Your info!</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'modal-body'}>
          <UserInfoFormContainer />
        </Modal.Body>
      </Modal>
    );
  }
}

UserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};
