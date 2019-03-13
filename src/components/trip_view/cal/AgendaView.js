import PropTypes from 'prop-types';
import React from 'react';

import dates from './utils/dates';
import { navigate } from './utils/constants';
import { inRange } from './utils/eventLevels';
import { AgendaItem } from './AgendaItem';

class Agenda extends React.Component {
  render() {
    let { length, date, events, accessors, localizer } = this.props;
    let { messages } = localizer;
    let end = dates.add(date, length, 'day');

    let range = dates.range(date, end, 'day');

    events = events.filter((event) => inRange(event, date, end, accessors));

    events.sort((a, b) => +accessors.start(a) - +accessors.start(b));

    return (
      <div className="rbc-agenda-view">
        {events.length !== 0 ? (
          <div className="rbc-agenda-content" ref="content">
            {range.map((day, idx) => this.renderDay(day, events, idx))}
          </div>
        ) : (
          <span className="rbc-agenda-empty">{messages.noEventsInRange}</span>
        )}
      </div>
    );
  }

  renderDay(day, events, dayKey) {
    let { selected, accessors, localizer } = this.props;

    console.log(selected);
    events = events.filter((e) => {
      return inRange(
        e,
        dates.startOf(day, 'day'),
        dates.endOf(day, 'day'),
        accessors
      );
    });

    return events.map((event, idx) => {

      let dateLabel = idx === 0 && localizer.format(day, 'MMMM Do YYYY');

      let first =
        idx === 0 ? (
          <h3 key={"__" + idx}>
            {dateLabel}
          </h3>
        ) : (
          false
        );

      return (
        <React.Fragment key={dayKey + "_" + idx}>
          {first}
          <AgendaItem
            event={event}
            accessors={accessors}
            localizer={localizer}
          />
        </React.Fragment>
      );
    }, []);
  };
}

Agenda.propTypes = {
  events: PropTypes.array,
  date: PropTypes.instanceOf(Date),
  length: PropTypes.number.isRequired,

  selected: PropTypes.object,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired
};

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
