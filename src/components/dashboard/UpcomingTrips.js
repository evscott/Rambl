import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import UpdateTripModal from '../trip_edit/UpdateTripModal';

/**
 *  UpcomingTrips displays a list of all upcoming
 *  trips recorded by user
 */

export default class UpcomingTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditTrip: false,
      currTrip: null
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.quitEditTrip = this.quitEditTrip.bind(this);
    this.openEditTrip = this.openEditTrip.bind(this);
  }
  /**************************** Helper functions ****************************/
  hasUpcoming() {
    return this.props.upcoming && this.props.upcoming.length;
  }

  handleDelete(trip) {
    this.props.deleteTrip(trip);
  }

  /**
   * This closes the edit trip modal.
   */
  quitEditTrip() {
    this.setState({
      showEditTrip: false,
      currTrip: null
    });
  }

  /**
   * This opens the edit trip modal.
   * @param trip the trip to edit.
   */
  openEditTrip(trip) {
    this.setState({
      showEditTrip: true,
      currTrip: trip
    });
  }

  /**
   * Get HTML for each upcoming trip
   * @returns {*} HTML for upcoming trips
   */
  getAllUpcoming() {
    const listItems = this.props.upcoming.map((trip) => (
      <div key={trip.trip_id}>
        <Link to={'/trip?id=' + trip.trip_id + '&view=month&filter=all'}>
          <p>{trip.name}</p>
        </Link>
        <p>{trip.dscript}</p>
        <Button
          variant={'danger'}
          className={'float-right'}
          onClick={() => this.handleDelete(trip)}
        >
          <FontAwesomeIcon size={'sm'} icon={['fas', 'bomb']} />
        </Button>
        <Button
          variant={'info'}
          className={'float-right'}
          onClick={() => this.openEditTrip(trip)}
        >
          <FontAwesomeIcon size={'sm'} icon={['fas', 'pencil-alt']} />
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
          {this.getAllUpcoming()}
        </div>
      );
    }
  }

  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        {this.getUpcomingDiv()}
        <UpdateTripModal
          show={this.state.showEditTrip}
          onHide={this.quitEditTrip}
          trip={this.state.currTrip}
        />
      </div>
    );
  }
}
