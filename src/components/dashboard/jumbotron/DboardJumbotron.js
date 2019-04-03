import React, { Component } from 'react';
import OngoingJumbotronContainer from './OngoingJumbotronContainer';
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
      return <OngoingJumbotronContainer trip={this.props.currTripInfo.trip} />;
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
