import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './EventNewForm.css';
import { ToggleUseDates } from './fields/ToggleUseDates';
import { DateField } from './fields/DateField';
import { LocationField } from './fields/LocationField';
import { CostField } from './fields/CostField';
import { DescriptionField } from './fields/DescriptionField';

export class EventNewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      useDates: true,
      eventType: props.eventType,
      ...props.event
    };
    this.toggleUseDates = this.toggleUseDates.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /***************************** Core functions *****************************/

  /**
   *
   */
  toggleUseDates() {
    this.setState({
      useDates: !this.state.useDates
    });
  }

  /**
   *
   * @param t
   * @param val
   */
  handleChange(t, val) {
    this.setState({ [t]: val });
  }

  /**
   *
   */
  handleSubmit() {
    this.props.addEvent(this.props.getEvent(this.state));
    this.props.close();
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        {/*Create event form*/}
        <div>
          <Form>
            <ToggleUseDates
              eventType={this.state.eventType}
              toggleUseDates={this.toggleUseDates}
            />
            <DateField
              begin_time={this.state.begin_time}
              end_time={this.state.end_time}
              useDates={this.state.useDates}
              handleChange={this.handleChange}
            />
            <LocationField
              eventType={this.state.eventType}
              handleChange={this.handleChange}
            />
            <CostField
              eventType={this.state.eventType}
              handleChange={this.handleChange}
            />
            <DescriptionField
              eventType={this.state.eventType}
              useDates={this.state.useDates}
              handleChange={this.handleChange}
            />
          </Form>
        </div>
        {/*Buttons*/}
        <Button variant="primary" size="sm" onClick={this.handleSubmit}>
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
  addEvent: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
