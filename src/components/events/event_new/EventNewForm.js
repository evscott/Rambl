import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EventNewForm.css';
import Form from 'react-bootstrap/Form';
import { Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker/es';
import CurrencyInput from 'react-currency-input-field';
import { formatDateForUser } from '../../../shared/dateFormatter';

export class EventNewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDates: true,
      eventType: props.eventType,
      event: props.event
    };
    this.locationField = this.locationField.bind(this);
    this.costField = this.costField.bind(this);
    this.toggleDisplayDates = this.toggleDisplayDates.bind(this);
    this.beginDatePlaceHolder = this.beginDatePlaceHolder.bind(this);
    this.endDatePlaceHolder = this.endDatePlaceHolder.bind(this);
  }

  /**
   *
   */
  beginDatePlaceHolder() {
    return this.state.event.begin_time
      ? formatDateForUser(this.state.event.begin_time)
      : 'Begins';
  }

  /**
   *
   */
  endDatePlaceHolder() {
    return this.state.event.end_time
      ? formatDateForUser(this.state.event.end_time)
      : 'Ends';
  }

  /**
   *
   * @returns {*}
   */
  locationField() {
    if (this.state.eventType === 'tran')
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
    // else display only location
    return (
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control placeholder="Location" />
      </Form.Group>
    );
  }

  /**
   *
   * @returns {*}
   */
  toggleDisplayDatesField() {
    if (this.state.eventType === 'plan')
      // display toggle display dates field
      return (
        <div>
          <Form.Group>
            <Form.Check
              label="Ignore dates"
              type={'checkbox'}
              key={1}
              onChange={this.toggleDisplayDates}
            />
          </Form.Group>
        </div>
      );
  }

  /**
   *
   * @returns {*}
   */
  dateField() {
    if (this.state.displayDates)
      // display dates
      return (
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Begins</Form.Label>
              <div>
                <DatePicker
                  className={'form-control date-width'}
                  selected={this.props.begin_time}
                  onChange={this.handleChange}
                  placeholderText={this.beginDatePlaceHolder()}
                />
              </div>
            </Col>
            <Col>
              <Form.Label>Ends</Form.Label>
              <div>
                <DatePicker
                  className={'form-control date-width'}
                  selected={this.props.begin_time}
                  onChange={this.handleChange}
                  placeholderText={this.endDatePlaceHolder()}
                />
              </div>
            </Col>
          </Form.Row>
        </Form.Group>
      );
  }

  /**
   *
   * @returns {*}
   */
  costField() {
    if (this.state.eventType === 'tran')
      // display mode of transportation & cost
      return (
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Row>
            <Col>
              <Form.Label>Mode of transportation</Form.Label>
              <Form.Control as="select" onChange={this.onChange}>
                <option disabled>Select your option</option>
                <option value={'plane'}>Plane</option>
                <option value={'train'}>Train</option>
                <option value={'automobile'}>Automobile</option>
                <option value={'bus'}>Bus</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Cost</Form.Label>
              <CurrencyInput
                className={'form-control'}
                placeholder="$0"
                onChange={this.handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>
      );
    // else display only cost
    return (
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Cost</Form.Label>
        <CurrencyInput
          className={'form-control'}
          placeholder="$0"
          onChange={this.handleChange}
        />
      </Form.Group>
    );
  }

  /**
   *
   * @returns {*}
   */
  descriptionField() {
    if (this.state.eventType === 'plan' && this.state.displayDates)
      // display description field with one row
      return (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="1" />
        </Form.Group>
      );
    // else display description field with two rows
    return (
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="2" />
      </Form.Group>
    );
  }

  /***************************** Core functions *****************************/

  /**
   *
   * @param e
   */
  handleChange(e) {
    console.log('E new form', e);
  }

  /**
   *
   */
  toggleDisplayDates() {
    this.setState({ displayDates: !this.state.displayDates });
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        {/*Add event form*/}
        <div>
          <Form>
            {/*Location field*/}
            {this.locationField()}
            {/*Toggle display dates field*/}
            {this.toggleDisplayDatesField()}
            {/*Date field*/}
            {this.dateField()}
            {/*Cost field*/}
            {this.costField()}
            {/* Description field*/}
            {this.descriptionField()}
          </Form>
        </div>
        {/*Buttons*/}
        <Button variant="primary" size="sm">
          <b>Submit</b>
        </Button>
      </div>
    );
  }
}

EventNewForm.propTypes = {
  event: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  eventType: PropTypes.string.isRequired,
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
