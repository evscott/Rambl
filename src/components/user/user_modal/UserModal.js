import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UserViewContainer from '../user_view/UserViewContainer';
import UserEdit from '../user_edit/UserEditContainer';
import './UserModal.css';

/**
 * This component creates a user information modal. It accepts two properties:
 * show and onHide. Show is a boolean value which determines whether the
 * modal should be displayed, and onHide is a button which toggles the
 * value of show.
 */
export class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /***************************** Core functions *****************************/

  /**
   * Toggles whether userInformation should be in view or edit mode.
   */
  toggleEdit() {
    this.setState({ editMode: !this.state.editMode });
  }

  /**
   * Resets userInformation to view mode and closes modal.
   */
  closeModal() {
    this.setState({ editMode: false }, () => {
      this.props.onHide();
    });
  }

  /**************************** Visual component ****************************/

  render() {
    let userForm = this.state.editMode ? (
      <UserEdit onReturn={this.toggleEdit} />
    ) : (
      <UserViewContainer onEdit={this.toggleEdit} />
    );

    return (
      <Modal show={this.props.show} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your info!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{userForm}</Modal.Body>
      </Modal>
    );
  }
}

UserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};
