import React, { Component } from 'react';
import DboardJumbotronContainer from './jumbotron/DboardJumbotronContainer';
import UpcomingTripsContainer from './UpcomingTripsContainer';
import PreviousTripsContainer from './PreviousTripsContainer';
import DashboardNavContainer from './DashboardNavContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewTripModal from '../trip_edit/NewTripModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
          <OverlayTrigger
            key="1"
            placement="top"
            overlay={<Tooltip>Add Trip</Tooltip>}
          >
            <FontAwesomeIcon
              className="clickable lg-icon dark-blue"
              icon="plus-circle"
              onClick={(e) => {
                this.startCreateEvent(e);
              }}
            />
          </OverlayTrigger>
        </div>
        <NewTripModal
          show={this.state.showNewTrip}
          onHide={this.quitCreateEvent}
        />
        <footer className="reverse-blue-gradient content">
          <h4>Rambl team</h4><br />
          <p>Morgan Bender</p>
          <p>Isaiah Bishop</p>
          <p>Eliot Scott</p>
          <p>Graeme Zinc</p>
        </footer>
      </div>
    );
  }
}
