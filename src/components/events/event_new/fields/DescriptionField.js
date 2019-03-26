import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import '../EventNewForm.css';

export class DescriptionField extends Component {
  render() {
    if (this.props.eventType === 'plan' && this.props.displayDates)
      // display description field with one row
      return (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="1" />
        </Form.Group>
      );
    // display description field with two rows
    else
      return (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="2" />
        </Form.Group>
      );
  }
}

DescriptionField.propTypes = {
  eventType: PropTypes.string.isRequired,
  displayDates: PropTypes.bool.isRequired
};
