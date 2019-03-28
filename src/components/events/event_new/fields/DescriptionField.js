import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import '../EventNewForm.css';

export class DescriptionField extends Component {
  constructor(props) {
    super(props);
    this.receiveDescription = this.receiveDescription.bind(this);
  }

  /***************************** Core functions *****************************/

  /**
   * Receives the description of an event.
   * @param input the description of an event.
   */
  receiveDescription(input) {
    this.props.handleChange('dscript', input.target.value);
  }

  /**************************** Visual component ****************************/

  render() {
    if (this.props.eventType === 'plan' && this.props.useDates)
      // display description field with one row
      return (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="1"
            onChange={this.receiveDescription}
          />
        </Form.Group>
      );
    // display description field with two rows
    else
      return (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="2"
            onChange={this.receiveDescription}
          />
        </Form.Group>
      );
  }
}

DescriptionField.propTypes = {
  eventType: PropTypes.string.isRequired,
  useDates: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
};
