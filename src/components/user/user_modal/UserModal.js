import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UserInfoFormContainer from '../user_info_form/UserInfoFormContainer';

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
