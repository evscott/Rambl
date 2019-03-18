import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import { allDayAccessor } from '../accessors';
import { allDayAccessor } from './utils/accessors';
import { TripCalToolbar } from './TripCalToolbar';
import { EventModal } from '../event_modal/EventModal';
import './TripCal.css';
import Agenda from './AgendaView';
import ToDoView from './ToDoView';

// Localizer for the calendar for formatting date objects
const localizer = BigCalendar.momentLocalizer(moment);

/**
 * TripCal is a component for displaying a trip's calendar view.
 * It requires the TripCalContainer to function.
 * To go to the page with the trip view, simply go to the address
 * '/trips?id=29' to go to trip id 29's calendar (for instance).
 */
export class TripCal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEvent: false,
      currEvent: null
    };
    this.selectEvent = this.selectEvent.bind(this);
    this.deselectEvent = this.deselectEvent.bind(this);
  }

  /**
   * Selects an event for displaying in a modal.
   * @param event the event to display.
   */
  selectEvent(event) {
    this.setState({ showEvent: true, currEvent: event });
  }

  /**
   * This method will be passed as an argument to the event display pages.
   */
  deselectEvent() {
    this.setState({ showEvent: false, currEvent: null });
  }

  render() {
    // Define the special components for the BigCalendar which differ from
    // the defaults.
    let components = {
      toolbar: TripCalToolbar
    };
    return (
      <div>
        <div className="cal-container">
          <BigCalendar
            localizer={localizer}
            events={this.props.events}
            view={this.props.view}
            onView={() => {}} // Do nothing
            titleAccessor="dscript"
            tooltipAccessor="dscript"
            startAccessor="begin_time"
            endAccessor="end_time"
            allDay={allDayAccessor}
            onSelectEvent={this.selectEvent}
            popup={true}
            components={components}
            views={{
              month: true,
              week: true,
              day: true,
              agenda: Agenda,
              todo: ToDoView
            }}
          />
        </div>
        <EventModal
          show={this.state.showEvent}
          onHide={this.deselectEvent}
          event={this.state.currEvent}
        />
      </div>
    );
  }
}

TripCal.propTypes = {
  location: PropTypes.any.isRequired // The window's URL
};
