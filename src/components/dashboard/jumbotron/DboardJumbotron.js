import React, { Component } from 'react';
import OngoingJumbotronContainer from './OngoingJumbotronContainer';
import UpcomingJumbotronContainer from './UpcomingJumbotronContainer';
import './DboardJumbotron.css';
import NewTripModal from '../../trip_edit/NewTripModal';

/**
 *  DBoardJumbotron handles the logic for which dashboard jumbotron we are
 *  displaying (an ongoing trip, countdown to next trip, or no
 *  upcoming trips)
 */

export default class DboardJumbotron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewTrip: false
    };

    this.startCreateEvent = this.startCreateEvent.bind(this);
    this.quitCreateEvent = this.quitCreateEvent.bind(this);
  }
  /**************************** Helper functions ****************************/
  displayCurrent() {
    return this.props.currTripInfo.current;
  }

  hasActiveTrip() {
    return this.props.allActiveTrips.length;
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
        <p
          onClick={(e) => {
            this.startCreateEvent(e);
          }}
          className="clickable"
        >
          <strong>Create one now!</strong>
        </p>
        <NewTripModal
          show={this.state.showNewTrip}
          onHide={this.quitCreateEvent}
        />
      </div>
    );
  }

  /**************************** Visual component ****************************/
  render() {
    return (
      <div className="jumbotron-container">
        <div className="content-top">{this.selectJumbotron()}</div>
      </div>
    );
  }
}
