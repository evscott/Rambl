import React, { Component } from 'react';
import CurrentJumbotronContainer from './CurrentJumbotronContainer';
import UpcomingJumbotronContainer from './UpcomingJumbotronContainer';
import NullJumbotron from './NullJumbotron';

/**
 *  This component handles the logic for which dashboard jumbotron we are
 *  displaying (an ongoing trip, countdown to next trip, or no
 *  upcoming trips)
 */

export default class DboardJumbotron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCurrent: this.props.currTripInfo.current,
      hasActiveTrip: this.props.allActiveTrips.length
    }
  }

  /***************************** Core functions *****************************/
  /**
   * @returns instantiation of appropriate jumbotron component
   */
  selectJumbotron(){
    if(this.state.displayCurrent){
      return <CurrentJumbotronContainer id={this.props.currTripInfo.trip.trip_id} />
    }
    else if(!this.state.hasActiveTrip){
      return <NullJumbotron />
    }
    return <UpcomingJumbotronContainer />
  }

  /**************************** Visual component ****************************/
  render() {
    return(
      <div>
        {this.selectJumbotron()}
      </div>
    );
  };
}
