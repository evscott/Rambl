import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './EventModal.css';
import EventInfo from '../../event_view/event_info/EventInfo';

/**
 * This is a popup modal which displays the event information. It should contain
 * a component that is specific to the type of event being shown.
 */
export class EventModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let eventComponent = null;

    // Vary what component to show based on what type of event we have.
    if (this.props.event != null) {
      switch (this.props.event.event_type) {
        case 'plan':
          eventComponent = <EventInfo event={this.props.event} />;
          break;
        case 'accom':
          eventComponent = <EventInfo event={this.props.event} />;
          break;
        case 'trans':
          eventComponent = <EventInfo event={this.props.event} />;
          break;
        default:
          eventComponent = <p>Odd. We have an undefined event type.</p>;
      }
    }
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.event != null ? this.props.event.dscript : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{eventComponent}</Modal.Body>
      </Modal>
    );
  }
}

EventModal.propTypes = {
  show: PropTypes.bool.isRequired, // To show the modal or not
  onHide: PropTypes.func.isRequired, // What function to call when try to close
  event: PropTypes.any // The event object to display
};
