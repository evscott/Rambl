import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Fade } from 'react-bootstrap';
import './EventModal.css';

export class EventModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.event != null ? this.props.event.dscript : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Insert event view here</h4>
          <p>
            This is an event:
            {this.props.event != null ? this.props.event.event_type : ''}
          </p>
        </Modal.Body>
      </Modal>
    );
  }
}

EventModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  event: PropTypes.any
};
