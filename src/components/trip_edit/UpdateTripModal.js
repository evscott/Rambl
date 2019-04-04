import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import UpdateTripFormContainer from './UpdateTripFormContainer';

/**
 * This is a popup modal which allows a user to input information for
 * updating a trip.
 */
export default class UpdateTripModal extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'modal-body'}>
          <UpdateTripFormContainer close={this.props.onHide} trip={this.props.trip} />
        </Modal.Body>
      </Modal>
    );
  }
}

UpdateTripModal.propTypes = {
  show: PropTypes.bool.isRequired, // To show the modal or not
  onHide: PropTypes.func.isRequired, // What function to call when try to close
  trip: PropTypes.any // The trip to update
};
