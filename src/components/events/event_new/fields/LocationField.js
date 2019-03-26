import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../EventNewForm.css';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';

export class LocationField extends Component {
  render() {
    if (this.props.eventType === 'tran')
      // display departing from and arriving to locations
      return (
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Departing from</Form.Label>
              <Form.Control placeholder="Departing from" />
            </Col>
            <Col>
              <Form.Label>Arriving to</Form.Label>
              <Form.Control placeholder="Arriving to" />
            </Col>
          </Form.Row>
        </Form.Group>
      );
    // display only location
    else
      return (
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control placeholder="Location" />
        </Form.Group>
      );
  }
}

LocationField.propTypes = {
  eventType: PropTypes.string.isRequired
};
