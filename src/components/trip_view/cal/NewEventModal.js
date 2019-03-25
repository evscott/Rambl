import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './NewEventModal.css';
import { EventNewDirector } from '../../events/EventNewDirector';

/**
 * This is a popup modal which allows a user to input information for a
 * new event. It takes in two parts of the event to create: the start
 * and end time (both are optional). This allows selecting a time slot
 * on the calendar and automatically populating the event to be created
 * with the information.
 */
export class NewEventModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'modal-body'}>
          <EventNewDirector begin_time={this.props.start} end_time={this.props.end}/>
        </Modal.Body>
      </Modal>
    );
  }
}

NewEventModal.propTypes = {
  show: PropTypes.bool.isRequired, // To show the modal or not
  onHide: PropTypes.func.isRequired, // What function to call when try to close
  start: PropTypes.any, // Start time of the event
  end: PropTypes.any // End time of the event
};
