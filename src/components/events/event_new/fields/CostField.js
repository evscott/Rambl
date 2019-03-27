import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import '../EventNewForm.css';

export class CostField extends Component {
  constructor(props) {
    super(props);
    this.receiveCost = this.receiveCost.bind(this);
  }

  /***************************** Core functions *****************************/

  /**
   * Receives the cost of the event.
   * @param cost of event.
   */
  receiveCost(cost) {
    this.props.handleChange('cost', cost);
  }

  /**************************** Visual component ****************************/

  render() {
    // else display only cost
    return (
      <Col>
        <Form.Label>Cost</Form.Label>
        <CurrencyInput
          className={'form-control'}
          placeholder="$0"
          onChange={this.receiveCost}
        />
      </Col>
    );
  }
}

CostField.propTypes = {
  eventType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
