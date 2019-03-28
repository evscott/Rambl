import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import { allDayAccessor } from '../utils/accessors';
import { TripCalToolbar } from './TripCalToolbar';
import { EventModal } from '../event_modal/EventModal';
import './TripCal.css';
import Agenda from '../custom_cal_views/AgendaView';
import ToDoView from '../custom_cal_views/ToDoView';
import { NewEventModal } from '../event_modal/NewEventModal';

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
      showEvent: false, // Show event info modal
      currEvent: null,
      showNewEvent: false, // Show create new event modal
      start: null, // The start time of the new event to create
      end: null // The end time of the new event to create
    };
    this.selectEvent = this.selectEvent.bind(this);
    this.deselectEvent = this.deselectEvent.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.quitCreateEvent = this.quitCreateEvent.bind(this);
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

  /**
   * Creates a new event by opening the popup modal for creating events.
   * @param start start time for the new event (if applicable)
   * @param end end time for the new event (if applicable)
   */
  createEvent({ start, end }) {
    this.setState({ showNewEvent: true, start: start, end: end });
  }

  /**
   * This closes the create event modal.
   */
  quitCreateEvent() {
    this.setState({ showNewEvent: false });
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
            selectable // Makes it possible to select time slots
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
            onSelectSlot={this.createEvent}
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
        <NewEventModal
          show={this.state.showNewEvent}
          onHide={this.quitCreateEvent}
          start={this.state.start}
          end={this.state.end}
          trip_id={this.props.id}
        />
      </div>
    );
  }
}

TripCal.propTypes = {
  location: PropTypes.any.isRequired // The window's URL
};
