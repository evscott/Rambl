import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CurrencyInput from 'react-currency-input-field';
import './EventFieldEdit.css';
import { FormInput } from '../../global/FormInput';
import { formatDateForUser } from '../../../shared/dateFormatter';
import { usdFormatter } from '../../../shared/currencyFormatter';

/**
 * EventFieldEdit is a visual element for an event, which receives and displays
 * a field type and value.
 */

export default class EventFieldNew extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.name);
    this.state = {
      value: this.props.value
    };
  }

  /**************************** Visual component ****************************/

  /**
   * Renders a text input
   * @returns {*} the text input
   */
  renderTextInput() {
    return (
      <Form className={'inputWidth'}>
        <FormInput
          name={this.props.name}
          type={this.props.type}
          handleChange={this.props.onChange}
          value={this.state.value}
          placeholder={this.props.type}
          size={'sm'}
        />
      </Form>
    );
  }

  render() {
    let inputField = this.renderTextInput();
    return <td>{inputField}</td>;
  }
}

EventFieldNew.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
};
