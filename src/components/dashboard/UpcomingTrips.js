import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 *  UpcomingTrips displays a list of all upcoming
 *  trips recorded by user
 */

export default class UpcomingTrips extends Component {
  /**************************** Helper functions ****************************/
  hasUpcoming() {
    return this.props.upcoming && this.props.upcoming.length;
  }

  /**
   * Get HTML for each upcoming trip
   * @returns {*} HTML for upcoming trips
   */
  getAllUpcoming() {
    const listItems = this.props.upcoming.map((trip) => (
      <div key={trip.trip_id}>
        <Link to={'/trip?id=' + trip.trip_id + '&view=month'}>
          <p>{trip.name}</p>
        </Link>
        <p>{trip.dscript}</p>
      </div>
    ));

    return listItems;
  }

  /***************************** Core functions *****************************/
  /**
   * Generate header and call to helper function if upcoming trips exist
   * @returns {*} All HTML for upcoming trips component
   */
  getUpcomingDiv() {
    if (this.hasUpcoming()) {
      return (
        <div id="section-upcoming">
          <h1>Upcoming Trips</h1>
          {this.getAllUpcoming()}
        </div>
      );
    }
  }

  /**************************** Visual component ****************************/
  render() {
    return <div>{this.getUpcomingDiv()}</div>;
  }
}