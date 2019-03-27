import PropTypes from 'prop-types';
import React from 'react';

import dates from '../utils/dates';
import { navigate } from '../utils/constants';
import { inRange } from '../utils/eventLevels';
import { AgendaItem } from './AgendaItem';
import { CreateEventCard } from './CreateEventCard';

/**
 * Agenda displaying all of the user's events in sequence. It shows it with
 * headers for each day and then Bootstrap cards for each event.
 * Note that this is used by react-big-calendar, so it has some code from
 * the library that is default for all views.
 */
class Agenda extends React.Component {
  render() {
    let { length, date, events, accessors } = this.props;

    // This gets the last date which should be displayed by the agenda
    // (only shows one month at a time)
    let end = dates.add(date, length, 'day');
    let range = dates.range(date, end, 'day');

    // Get the events that are in the right range
    events = events.filter((event) => inRange(event, date, end, accessors));

    // Sort by date (the + turns them into numbers that are easily sortable)
    events.sort((a, b) => +accessors.start(a) - +accessors.start(b));

    // Figure out what to show for the agenda (depends on if there are any events)
    let agendaContent;
    if (events.length !== 0) {
      agendaContent = (
        <div className="rbc-agenda-content" ref="content">
          <CreateEventCard onCreateEvent={this.props.onSelectSlot} />
          {range.map((day, idx) => this.renderDay(day, events, idx))}
        </div>
      );
    } else {
      agendaContent = (
        <span className="rbc-agenda-empty">
          <CreateEventCard onCreateEvent={this.props.onSelectSlot} />
        </span>
      );
    }

    return <div className="rbc-agenda-view">{agendaContent}</div>;
  }

  /**
   * This renders a single day worth of events.
   * @param day javascript date object for the day to render
   * @param events the events to sort through
   * @param dayKey the key used by react to keep track of the event
   * @returns {*} react fragment representing the day
   */
  renderDay(day, events, dayKey) {
    let { accessors, localizer } = this.props;

    // Narrow down the events to just have the single day's events
    events = events.filter((event) => {
      // This uses a react-big-calendar helper method
      return inRange(
        event,
        dates.startOf(day, 'day'),
        dates.endOf(day, 'day'),
        accessors
      );
    });

    // Now, create react fragments for every one of the agenda items
    return events.map((event, idx) => {
      // If first event of the day, show the label for the event
      let first = false;
      if (idx === 0) {
        let dateLabel = localizer.format(day, 'MMMM Do YYYY');
        first = <h3 key={'__' + idx}>{dateLabel}</h3>;
      }

      return (
        <React.Fragment key={dayKey + '_' + idx}>
          {first}
          <AgendaItem
            event={event}
            accessors={accessors}
            localizer={localizer}
            onSelectEvent={this.props.onSelectEvent}
          />
        </React.Fragment>
      );
    }, []);
  }
}

Agenda.propTypes = {
  events: PropTypes.array, // The events to show
  date: PropTypes.instanceOf(Date), // The date to start at
  length: PropTypes.number.isRequired, // The length of time to show

  accessors: PropTypes.object.isRequired, // How to get the data from event objects
  localizer: PropTypes.object.isRequired, // moment localizer for dates
  onSelectSlot: PropTypes.func.isRequired // what to do when want to create new!
};

// This is default for react-big-calendar
Agenda.defaultProps = {
  length: 30
};

// This is required for react-big-calendar
Agenda.range = (start, { length = Agenda.defaultProps.length }) => {
  let end = dates.add(start, length, 'day');
  return { start, end };
};

// This is required for react-big-calendar
Agenda.navigate = (date, action, { length = Agenda.defaultProps.length }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -length, 'day');

    case navigate.NEXT:
      return dates.add(date, length, 'day');

    default:
      return date;
  }
};

// This is required for react-big-calendar
Agenda.title = (start, { length = Agenda.defaultProps.length, localizer }) => {
  let end = dates.add(start, length, 'day');
  return localizer.format({ start, end }, 'agendaHeaderFormat');
};

export default Agenda;
