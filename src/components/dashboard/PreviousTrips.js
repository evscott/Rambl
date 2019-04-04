import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UpdateTripModal from '../trip_edit/UpdateTripModal';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

/**
 *  PreviousTrips displays a list of all previous
 *  trips recorded by user
 */

export default class PreviousTrips extends Component {
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
  hasPrevious() {
    return this.props.previous && this.props.previous.length;
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
   * Generates HTML for each previous trip
   * @returns {*} HTML for each trip in props.previous array
   */
  getAllPrevious() {
    return this.props.previous.map((trip) => (
      <div className="space-between">
        <div className="trip-card yellow-gradient">
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
  }

  /***************************** Core functions *****************************/
  /**
   * Generate header and call to helper function if previous trips exist
   * @returns {*} All HTML for previous trips component
   */
  getPreviousDiv() {
    if (this.hasPrevious()) {
      return (
        <div id="section-previous" className="section">
          <h1>Previous Trips</h1>
          <div className="flex-wrap-center content">
            {this.getAllPrevious()}
          </div>
        </div>
      );
    }
  }

  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        {this.getPreviousDiv()}
        <UpdateTripModal
          show={this.state.showEditTrip}
          onHide={this.quitEditTrip}
          trip={this.state.currTrip}
        />
      </div>
    );
  }
}
