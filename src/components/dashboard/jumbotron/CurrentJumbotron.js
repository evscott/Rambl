import React, { Component } from 'react';

/**
 *  CurrentJumbotron displays information for a trip
 *  that is currently in progress
 */

export default class CurrentJumbotron extends Component {
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
        <p>{event.name}</p>
        <p>{event.dscript}</p>
      </div>
    ));
  }

  // Get information for next upcoming event
  // TODO: Modal support
  /**
   * Get HTML for upcoming event(s)
   * @returns {*} HTML for next upcoming event
   */
  getUpcomingEvents() {
    if (this.hasUpcomingEvent()) {
      const upcoming = this.props.upcomingEvents.shift();

      return (
        <div>
          <p>{upcoming.name}</p>
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
  getCurrentDiv() {
    if (this.state.hasCurrEvent) {
      return (
        <div>
          <h2>Ongoing Events</h2>
          {this.getCurrentEvents()}
        </div>
      );
    }
  }

  /**
   * Creates all HTML for upcoming events (if any exist)
   * @returns {*} HTML for upcoming events
   */
  getUpcomingDiv() {
    if (this.state.hasUpcomingEvent) {
      return (
        <div>
          <h2>Next Event</h2>
          {this.getUpcomingEvents()}
        </div>
      );
    }
  }

  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        {this.getCurrentDiv()}
        {this.getUpcomingDiv()}
      </div>
    );
  }
}
