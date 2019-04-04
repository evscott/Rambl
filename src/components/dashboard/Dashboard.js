import React, { Component } from 'react';
import DboardJumbotronContainer from './jumbotron/DboardJumbotronContainer';
import UpcomingTripsContainer from './UpcomingTripsContainer';
import PreviousTripsContainer from './PreviousTripsContainer';
import DashboardNavContainer from './DashboardNavContainer';
import './Dashboard.css';
import { Button, Form } from 'react-bootstrap';
import NewTripModal from './NewTripModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 *  Dashboard is a component that holds all of the dashboard helper components
 */
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewTrip: false
    };

    this.startCreateEvent = this.startCreateEvent.bind(this);
    this.quitCreateEvent = this.quitCreateEvent.bind(this);
  }

  /***************************** Core functions *****************************/
  /**
   * This closes the create trip modal.
   */
  quitCreateEvent() {
    this.setState({ showNewTrip: false });
  }

  /**
   * This opens the create trip modal.
   * @param e click event
   */
  startCreateEvent(e) {
    e.preventDefault();
    this.setState({ showNewTrip: true });
  }
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <div className="top-bar">
          <DashboardNavContainer />
        </div>
        <DboardJumbotronContainer />
        <UpcomingTripsContainer />
        <PreviousTripsContainer />
        {/* New Trip Control */}
        <div className="fixed-bottom-right">
          <FontAwesomeIcon
            className="clickable lg-icon dark-blue"
            icon="plus-circle"
            onClick={(e) => {
              this.startCreateEvent(e);
            }}
          />
          <NewTripModal
            show={this.state.showNewTrip}
            onHide={this.quitCreateEvent}
          />
        </div>
      </div>
    );
  }
}
