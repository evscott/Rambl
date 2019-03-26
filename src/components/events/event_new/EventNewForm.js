import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './EventNewForm.css';
import { ToggleDisplayDates } from './fields/ToggleDisplayDates';
import { DateField } from './fields/DateField';
import { LocationField } from './fields/LocationField';
import { CostField } from './fields/CostField';
import { DescriptionField } from './fields/DescriptionField';

export class EventNewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDates: true,
      eventType: props.eventType,
      event: props.event
    };

    this.toggleDisplayDates = this.toggleDisplayDates.bind(this);
  }

  /***************************** Core functions *****************************/

  handleChange(e) {}

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
        {/*Create event form*/}
        <div>
          <Form>
            <ToggleDisplayDates
              eventType={this.state.eventType}
              toggleDisplayDates={this.toggleDisplayDates}
            />
            <DateField
              begin_time={this.state.event.begin_time.value}
              end_time={this.state.event.end_time.value}
              displayDates={this.state.displayDates}
              handleChange={this.handleChange}
            />
            <LocationField eventType={this.state.eventType} />
            <CostField
              eventType={this.state.eventType}
              handleChange={this.handleChange}
            />
            <DescriptionField
              eventType={this.state.eventType}
              displayDates={this.state.displayDates}
            />
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
