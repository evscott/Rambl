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

export default class EventFieldEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  /***************************** Core functions *****************************/
  /**
   * Handles the change of an events date.
   * @param e the event containing the new text.
   */
  handleTextChange(e) {
    this.setState({ value: e.target.value });
  }

  /**
   * Handles the change of an events date.
   * @param date the new date.
   */
  handleDateChange(date) {
    if (date !== null) this.setState({ value: date.toString() });
  }

  /**
   * Handles the change of an events cost.
   * @param cost the new cost.
   */
  handleCostChange(cost) {
    this.setState({ value: usdFormatter.format(cost) });
  }

  /**************************** Visual component ****************************/

  /**
   * Renders a text input
   * @returns {*} the text input
   */
  renderTextInput() {
    return (
      <Form className={'textInput'}>
        <FormInput
          displayName={this.props.type}
          name={this.props.name}
          type={this.props.type}
          handleChange={this.handleTextChange}
          value={this.state.value}
        />
      </Form>
    );
  }

  /**
   * Renders a currency input
   * @returns {*} the currency input
   */
  renderCurrencyInput() {
    return (
      <div>
        <div className={'inputHeader'}>
          <b> {this.props.type} </b>{' '}
        </div>

        <CurrencyInput
          className={'form-control currencyInput'}
          placeholder="$0"
          onChange={this.handleCostChange}
        />
      </div>
    );
  }

  /**
   * Renders a date selection field with restrictions.
   * @returns {*} the restricted date selection
   */
  renderRestrictedDateSelection() {
    return (
      <div>
        <div className={'inputHeader'}>
          <b> {this.props.type} </b>{' '}
        </div>

        <DatePicker
          className={'form-control dateInput'}
          selected={new Date(this.state.value)}
          onChange={this.handleDateChange}
          showTimeInput
          timeInputLabel="Time:"
          maxDate={new Date(this.props.end_time.value)}
          placeholderText={formatDateForUser(this.state.value)}
          dateFormat={'MMMM d, yyyy, h:mm aa'}
        />
      </div>
    );
  }

  /**
   * Renders a date selection field with no date restrictions.
   * @returns {*} the unrestricted date selection
   */
  renderUnrestrictedDateSelection() {
    return (
      <div>
        <div className={'inputHeader'}>
          <b> {this.props.type} </b>{' '}
        </div>

        <DatePicker
          className={'form-control dateInput'}
          selected={new Date(this.state.value)}
          onChange={this.handleDateChange}
          showTimeInput
          timeInputLabel="Time:"
          placeholderText={formatDateForUser(this.state.value)}
          dateFormat={'MMMM d, yyyy, h:mm aa'}
        />
      </div>
    );
  }

  render() {
    let inputField;

    switch (this.props.name) {
      case 'cost':
        inputField = this.renderCurrencyInput();
        break;
      case 'begin_time':
        inputField = this.renderRestrictedDateSelection();
        break;
      case 'end_time':
        inputField = this.renderUnrestrictedDateSelection();
        break;
      default:
        inputField = this.renderTextInput();
    }

    return (
      <td>
        {inputField}
        <button
          className={'btn btn-primary editSave'}
          onClick={() =>
            this.props.onSave(
              this.props.name,
              this.props.type,
              this.state.value
            )
          }
        >
          <b>Save changes</b>
        </button>
        <button
          className={'btn btn-secondary editCancel'}
          onClick={() =>
            this.props.onCancel(
              this.props.name,
              this.props.type,
              this.props.value
            )
          }
        >
          <b>Cancel</b>
        </button>
      </td>
    );
  }
}

EventFieldEdit.propTypes = {
  end_time: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
};
