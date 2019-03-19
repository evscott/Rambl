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
      value: this.props.field.value
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  /***************************** Core functions *****************************/
  /**
   * TODO
   * @param e
   */
  handleTextChange(e) {
    this.setState({ value: e.target.value });
  }

  /**
   * TODO
   * @param e
   */
  handleDateChange(e) {
    this.setState({ value: e.toString() });
  }

  /**
   * TODO
   * @param e
   */
  handleCostChange(e) {
    this.setState({ value: usdFormatter.format(e) });
  }

  /**************************** Visual component ****************************/
  render() {
    let inputField;

    switch (this.props.field.name) {
      case 'cost':
        inputField = this.renderCurrencyInput();
        break;
      case 'begin_time':
        inputField = this.renderLimitedDateSelection();
        break;
      case 'end_time':
        inputField = this.renderOpenDateSelection();
        break;
      default:
        inputField = this.renderTextInput();
    }

    return (
      <td>
        {inputField}
        <button
          className={'btn btn-primary editSave'}
          onClick={() => this.props.onClick(this.props.field, this.state.value)}
        >
          <b>Save changes</b>
        </button>
        <button
          className={'btn btn-secondary editCancel'}
          onClick={() => this.props.onClick(this.props.field)}
        >
          <b>Cancel</b>
        </button>
      </td>
    );
  }

  /**
   * TODO
   * @returns {*}
   */
  renderTextInput() {
    return (
      <Form className={'textInput'}>
        <FormInput
          displayName={this.props.field.type}
          name={this.props.field.name}
          type={this.props.field.type}
          handleChange={this.handleTextChange}
          value={this.state.value}
        />
      </Form>
    );
  }

  /**
   * TODO
   * @returns {*}
   */
  renderCurrencyInput() {
    return (
      <div>
        <div className={'inputHeader'}>
          <b> {this.props.field.type} </b>{' '}
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
   * TODO
   * @returns {*}
   */
  renderLimitedDateSelection() {
    return (
      <div>
        <div className={'inputHeader'}>
          <b> {this.props.field.type} </b>{' '}
        </div>

        <DatePicker
          className={'form-control dateInput'}
          selected={new Date(this.state.value)}
          onChange={this.handleDateChange}
          showTimeSelect
          maxDate={new Date(this.props.end_time.value)}
          placeholderText={formatDateForUser(this.state.value)}
          dateFormat="MMMM d, yyyy, h:mm aa"
        />
      </div>
    );
  }

  /**
   * TODO
   * @returns {*}
   */
  renderOpenDateSelection() {
    return (
      <div>
        <div className={'inputHeader'}>
          <b> {this.props.field.type} </b>{' '}
        </div>

        <DatePicker
          className="form-control dateInput"
          selected={new Date(this.state.value)}
          onChange={this.handleDateChange}
          showTimeSelect
          placeholderText={formatDateForUser(this.state.value)}
          dateFormat="MMMM d, yyyy, h:mm aa"
        />
      </div>
    );
  }
}

EventFieldEdit.propTypes = {
  field: PropTypes.object.isRequired,
  end_time: PropTypes.object.isRequired
};
