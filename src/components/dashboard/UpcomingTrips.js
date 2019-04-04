import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

/**
 *  UpcomingTrips displays a list of all upcoming
 *  trips recorded by user
 */

export default class UpcomingTrips extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  /**************************** Helper functions ****************************/
  hasUpcoming() {
    return this.props.upcoming && this.props.upcoming.length;
  }

  handleDelete(trip) {
    this.props.deleteTrip(trip);
  }

  /**
   * Get HTML for each upcoming trip
   * @returns {*} HTML for upcoming trips
   */
  getAllUpcoming() {
    const listItems = this.props.upcoming.map((trip) => (
      <div key={trip.trip_id} className="trip-box red-trip-box">
        <Link to={'/trip?id=' + trip.trip_id + '&view=month'}>
          <p>{trip.name}</p>
        </Link>
        <p>{trip.dscript}</p>
        <Button className="btn btn-red" onClick={() => this.handleDelete(trip)}>
          <FontAwesomeIcon size={'sm'} icon={['fas', 'bomb']} />
        </Button>
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
          <div className="flex-wrap-center">{this.getAllUpcoming()}</div>
        </div>
      );
    }
  }

  /**************************** Visual component ****************************/
  render() {
    return <div>{this.getUpcomingDiv()}</div>;
  }
}
