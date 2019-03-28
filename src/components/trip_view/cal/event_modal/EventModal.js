import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './EventModal.css';
import EventInfoSelector from '../../../events/EventInfoSelector';

/**
 * This is a popup modal which displays the event information. It should contain
 * a component that is specific to the type of event being shown.
 */
export class EventModal extends Component {
  render() {
    let eventView = false;
    if (this.props.event)
      eventView = (
        <EventInfoSelector event={this.props.event} close={this.props.onHide} />
      );
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.event != null ? this.props.event.dscript : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={'modal-body'}>{eventView}</Modal.Body>
      </Modal>
    );
  }
}

EventModal.propTypes = {
  show: PropTypes.bool.isRequired, // To show the modal or not
  onHide: PropTypes.func.isRequired, // What function to call when try to close
  event: PropTypes.any // The event object to display
};
