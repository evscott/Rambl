import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './react-big-calendar.css';

// Localizer for the calendar for formatting date objects
const localizer = BigCalendar.momentLocalizer(moment);

/**
 * Accessor function that retrieves if an event is considered
 * an "all day" event or not for display on the calendar.
 * @param event the event to display (given by BigCalendar)
 * @return true if the event is longer than 24 hours
 */
function allDayAccessor(event) {
  let start = moment(event.begin_time);
  let end = moment(event.end_time);
  let diff = end.diff(start, 'hours');
  return diff >= 24;
}

export class TripCal extends Component {
  render() {
    return (
      <div className="cal-container">
        <BigCalendar
          localizer={localizer}
          events={this.props.events}
          titleAccessor="dscript"
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
