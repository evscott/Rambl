import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import NewTripFormContainer from './NewTripFormContainer';

/**
 * This is a popup modal which allows a user to input information for a
 * new trip.
 */
export default class NewTripModal extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'modal-body'}>
          <NewTripFormContainer />
        </Modal.Body>
      </Modal>
    );
  }
}

NewTripModal.propTypes = {
  show: PropTypes.bool.isRequired, // To show the modal or not
  onHide: PropTypes.func.isRequired // What function to call when try to close
};
