import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import '../EventNewForm.css';

export class ModeOfTranField extends Component {
  constructor(props) {
    super(props);
    this.receiveModeOfTransport = this.receiveModeOfTransport.bind(this);
  }

  /***************************** Core functions *****************************/

  /**
   * Receives the mode of transportation to use.
   * @param mode of transportation to use.
   */
  receiveModeOfTransport(mode) {
    this.props.handleChange('method', mode.target.value);
  }

  /**************************** Visual component ****************************/

  render() {
    if (this.props.eventType === 'tran')
      return (
        <Col>
          <Form.Label>Mode of transportation</Form.Label>
          <Form.Control as="select" onChange={this.receiveModeOfTransport}>
            <option disabled>Select your option</option>
            <option value={'plane'}>Plane</option>
            <option value={'train'}>Train</option>
            <option value={'automobile'}>Automobile</option>
            <option value={'bus'}>Bus</option>
          </Form.Control>
        </Col>
      );
    else return null;
  }
}

ModeOfTranField.propTypes = {
  eventType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
