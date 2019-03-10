import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { allDayAccessor } from './cal/accessors';
import './react-big-calendar.css';

// Localizer for the calendar for formatting date objects
const localizer = BigCalendar.momentLocalizer(moment);

/**
 * TripCal is a component for displaying a trip's calendar view.
 * It requires the TripCalContainer to function.
 * To go to the page with the trip view, simply go to the address
 * '/trips?id=29' to go to trip id 29's calendar (for instance).
 */
export class TripCal extends Component {
  render() {
    return (
      <div className="cal-container">
        <BigCalendar
          localizer={localizer}
          events={this.props.events}
          titleAccessor="dscript"
          tooltipAccessor="dscript"
          startAccessor="begin_time"
          endAccessor="end_time"
          allDay={allDayAccessor}
        />
      </div>
    );
  }
}

TripCal.propTypes = {
  trip_id: PropTypes.number
};
