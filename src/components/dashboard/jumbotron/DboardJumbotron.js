import React, { Component } from 'react';
import CurrentJumbotronContainer from './CurrentJumbotronContainer';
import UpcomingJumbotronContainer from './UpcomingJumbotronContainer';

/**
 *  DBoardJumbotron handles the logic for which dashboard jumbotron we are
 *  displaying (an ongoing trip, countdown to next trip, or no
 *  upcoming trips)
 */

export default class DboardJumbotron extends Component {
  /**************************** Helper functions ****************************/
  displayCurrent() {
    return this.props.currTripInfo.current;
  }

  hasActiveTrip() {
    return this.props.allActiveTrips.length;
  }

  /***************************** Core functions *****************************/
  /**
   * @returns instantiation of appropriate jumbotron component
   */
  selectJumbotron() {
    if (this.displayCurrent()) {
      return (
        <CurrentJumbotronContainer id={this.props.currTripInfo.trip.trip_id} />
      );
    } else if (this.hasActiveTrip()) {
      return <UpcomingJumbotronContainer />;
    }
    return (
      <div>
        <p>You have no upcoming trips</p>
        <p>Create one now!</p>
      </div>
    );
  }

  /**************************** Visual component ****************************/
  render() {
    return <div>{this.selectJumbotron()}</div>;
  }
}
