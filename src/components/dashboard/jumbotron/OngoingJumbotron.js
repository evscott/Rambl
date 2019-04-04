import React, { Component } from 'react';
import HighlightsContainer from './HighlightsContainer';
import Notes from './Notes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

/**
 *  OngoingJumbotron displays information for a trip
 *  that is currently in progress
 */

export default class OngoingJumbotron extends Component {
  /**************************** Helper functions ****************************/
  hasCurrEvent() {
    return this.props.currEvents && this.props.currEvents.length;
  }

  hasUpcomingEvent() {
    return this.props.upcomingEvents && this.props.upcomingEvents.length;
  }

  /**
   * Get HTML for currently ongoing event(s)
   * TODO: Modal support
   * @returns {*} HTML for all currently ongoing events
   */
  getCurrentEvents() {
    return this.props.currEvents.map((event) => (
      <div>
        <p>{event.dscript}</p>
      </div>
    ));
  }

  /**
   * Get HTML for upcoming event(s)
   * @returns {*} HTML for next upcoming event
   */
  getUpcomingEvents() {
    if (this.hasUpcomingEvent()) {
      const upcoming = this.props.upcomingEvents.shift();

      return (
        <div>
          <p>{upcoming.dscript}</p>
        </div>
      );
    }
  }

  /***************************** Core functions *****************************/
  /**
   * Creates all HTML for current events (if they exist)
   * @returns {*} HTML for current events
   */
  getCurrentEventsDiv() {
    if (this.hasCurrEvent()) {
      return (
        <div>
          <h3>Ongoing Event</h3>
          {this.getCurrentEvents()}
        </div>
      );
    }
  }

  /**
   * Creates all HTML for upcoming events (if any exist)
   * @returns {*} HTML for upcoming events
   */
  getUpcomingEventsDiv() {
    if (this.hasUpcomingEvent()) {
      return (
        <div>
          <h3>Next Event</h3>
          {this.getUpcomingEvents()}
        </div>
      );
    }
  }

  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <p>You have an ongoing trip!</p>
        <div key={this.props.trip.trip_id}>
          <Link
            to={
              '/trip?id=' + this.props.trip.trip_id + '&view=month&filter=all'
            }
          >
            <h1>{this.props.trip.name}</h1>
          </Link>
        </div>
        <div className="flex-wrap-center">
          <div className="space-between">
            {this.getCurrentEventsDiv()}
          </div>
          <div className="space-between">
            {this.getUpcomingEventsDiv()}
          </div>
        </div>

        <div className="flex-wrap-center">
          {/* Highlights */}
          <div className="jumbo-component">
            <HighlightsContainer id={this.props.trip.trip_id} />
          </div>

          {/* Notes */}
          <div className="jumbo-component">
            <Notes dscript={this.props.trip.dscript} />
          </div>

          {/* Stats */}
          <div className="jumbo-component">
            <div className="icon-padding">
              <FontAwesomeIcon className="med-icon red" icon="chart-bar" />
            </div>
            <p>Stats component here</p>
          </div>
        </div>
      </div>
    );
  }
}
