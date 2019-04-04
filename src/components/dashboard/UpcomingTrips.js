import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card } from 'react-bootstrap';
import UpdateTripModal from '../trip_edit/UpdateTripModal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
      <div className="space-between">
        <div className="trip-card pink-gradient">
          <div className="sm-content">
            <Link to={'/trip?id=' + trip.trip_id + '&view=month&filter=all'}>
              <h4>{trip.name}</h4>
              <p>{trip.dscript}</p>
            </Link>
            <div className="flex-wrap-center show-on-hover">
              <OverlayTrigger
                key="1"
                placement="left"
                overlay={<Tooltip>Delete Trip</Tooltip>}
              >
                <div onClick={() => this.handleDelete(trip)}>
                  <FontAwesomeIcon
                    className="med-icon clickable black"
                    icon="bomb"
                  />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                key="1"
                placement="right"
                overlay={<Tooltip>Edit Trip</Tooltip>}
              >
                <div onClick={() => this.openEditTrip(trip)}>
                  <FontAwesomeIcon
                    className="med-icon clickable black"
                    icon="pencil-alt"
                  />
                </div>
              </OverlayTrigger>
            </div>
          </div>
        </div>
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
        <div id="section-upcoming" className="section">
          <h1>Upcoming Trips</h1>
          <div className="flex-wrap-center content">{this.getAllUpcoming()}</div>
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
