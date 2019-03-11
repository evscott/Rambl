import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './EventModal.css';

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
          eventComponent = <p>This is a plan event component.</p>;
          break;
        case 'accom':
          eventComponent = <p>Wow! This is an accommodation component!</p>;
          break;
        case 'trans':
          eventComponent = <p>This is a trans event component. Such wow.</p>;
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
        <Modal.Body>
          <h4>Insert event view here</h4>
          {eventComponent}
        </Modal.Body>
      </Modal>
    );
  }
}

EventModal.propTypes = {
  show: PropTypes.bool.isRequired, // To show the modal or not
  onHide: PropTypes.func.isRequired, // What function to call when try to close
  event: PropTypes.any // The event object to display
};
