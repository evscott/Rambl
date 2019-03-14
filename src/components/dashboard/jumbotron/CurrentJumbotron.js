import React, { Component } from 'react';

/**
 *  This component displays information for a trip
 *  that is currently in progress
 */

export default class CurrentJumbotron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCurrEvent: this.props.currEvents && this.props.currEvents.length,
      hasUpcomingEvent: this.props.upcomingEvents && this.props.upcomingEvents.length
    };
  }

  /**************************** Helper functions ****************************/
  // Get information for currently ongoing events
  // TODO: Modal support
  getCurrentEvents() {
    const listItems = this.props.currEvents.map((event) =>
      <div>
        <p>{event.name}</p>
        <p>{event.dscript}</p>
      </div>
    );
    return (listItems);
  }

  // Get information for next upcoming event
  // TODO: Modal support
  getUpcomingEvents() {
    if (this.state.hasUpcomingEvent) {
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
  // Creates a div for current events if they exist
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

  // Creates a div for next event if any exist
  getUpcomingDiv() {
    if(this.state.hasUpcomingEvent){
      return(
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
