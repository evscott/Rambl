import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../EventNewForm.css';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';

export class LocationField extends Component {
  constructor(props) {
    super(props);
    this.receiveDeparture = this.receiveDeparture.bind(this);
    this.receiveArrival = this.receiveArrival.bind(this);
    this.receiveLocation = this.receiveLocation.bind(this);
  }

  /**
   *
   * @param input
   */
  receiveDeparture(input) {
    this.props.handleChange('loc', input.target.value);
  }

  /**
   *
   * @param input
   */
  receiveArrival(input) {
    this.props.handleChange('loc_end', input.target.value);
  }

  /**
   *
   * @param input
   */
  receiveLocation(input) {
    this.props.handleChange('loc', input.target.value);
  }

  render() {
    if (this.props.eventType === 'tran')
      // display departing from and arriving to locations
      return (
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Departing from</Form.Label>
              <Form.Control
                placeholder="Departing from"
                onChange={this.receiveDeparture}
              />
            </Col>
            <Col>
              <Form.Label>Arriving to</Form.Label>
              <Form.Control
                placeholder="Arriving to"
                onChange={this.receiveArrival}
              />
            </Col>
          </Form.Row>
        </Form.Group>
      );
    // display only location
    else
      return (
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            placeholder="Location"
            onChange={this.receiveLocation}
          />
        </Form.Group>
      );
  }
}

LocationField.propTypes = {
  eventType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
